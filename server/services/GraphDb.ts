import GitApi from '../lib/GitApi'
import { JsonBased, jsonServiceFactoryArgs, JsonService } from './JsonService'
import { v4 as uuid } from 'uuid'

type GRAPH_NODE = {
	to: string
	from: string
	id: string
}
type GRAPH_NODES = GRAPH_NODE[]

function linkfactory<GRAPH_NODE>(data: any): GRAPH_NODE {
	return data.map(({ to, from, id }) => {
		id = id ?? uuid()
		return {
			id,
			to,
			from,
		}
	})
}
class Links extends JsonBased<GRAPH_NODE, GRAPH_NODES> {
	index: GRAPH_NODES
	indexPath: string = `/clippings/index.json`

	fetchIndex = async () => {
		let data = await this.jsonService.client.getFile(this.indexPath)
		let content = JSON.parse(data.content)
		this.index = content.map((node) => {
			return this.jsonService.entityFactory(node)
		})
	}
	maybeFetchIndex = async () => {
		return new Promise(async (resolve) => {
			if (this.index) {
				resolve(true)
			} else {
				await this.fetchIndex()
				resolve(true)
			}
		})
	}

	addLink = async (data: GRAPH_NODE | { to: string; from: string }) => {
		await this.maybeFetchIndex()
		let node = this.jsonService.entityFactory(data)
		this.index.push(node)
		await this.jsonService.client.saveFile(
			JSON.stringify(this.index),
			this.indexPath,
			`Added node ${node.id}`
		)
		return node
	}

	findLink = async (id: string): Promise<GRAPH_NODE | undefined> => {
		await this.maybeFetchIndex()
		let link = this.index.find((l) => l.id === id)
		return link
	}

	removeLink = async (id: string) => {
		let link = await this.findLink(id)
		if (link) {
			this.index.slice(
				//start at index of found link
				this.index.findIndex((l) => l.id === id),
				1 //delete one
			)
		}
	}
}

/**
 * Function that is supplied generic Entity and returns linked entities.
 *
 * Return is a GRAPH_NODES
 * 	Each GRAPH_NODE.from value should match Entity.id. GRAPH_NODES.to are the linked entities.
 *
 */
export type entityLinksFinder<Entity> = (entity: Entity) => GRAPH_NODES

class GraphDb<Entity, Collection> {
	linksDb: Links
	dataDb: JsonService<Entity, Collection>
	entityLinksFinder: entityLinksFinder<Entity>
	constructor(
		dataDb: JsonService<Entity, Collection>,
		linksDb: Links,
		entityLinksFinder: entityLinksFinder<Entity>
	) {
		this.dataDb = dataDb
		this.linksDb = linksDb
		this.entityLinksFinder = entityLinksFinder
	}

	getItem = async (
		id: string
	): Promise<{ item: Entity; linkedItems: GRAPH_NODES }> => {
		let item = await this.dataDb.getItem(id)
		let linkedItems = await this.getLinks(this.entityLinksFinder(item))
		return { item, linkedItems }
	}

	getLinks = async (linkedItems: GRAPH_NODES): Promise<GRAPH_NODES> => {
		let _linkedItems: GRAPH_NODES = []
		linkedItems.forEach(async (node) => {
			let link = await this.linksDb.findLink(node.id)
			if (!link) {
				link = await this.linksDb.addLink(node)
			}
			return link
		})
		return _linkedItems
	}

	addItem = async (
		item: Entity
	): Promise<{ item: Entity; linkedItems: GRAPH_NODES }> => {
		item = await this.dataDb.saveItem(
			//@ts-ignore
			item.id,
			item
		)
		let linkedItems = this.entityLinksFinder(item)
		if (linkedItems.length) {
			linkedItems = await this.getLinks(linkedItems)
		}

		return { item, linkedItems }
	}
}

export function graphDbFactory<Entity, Collection>(
	args: jsonServiceFactoryArgs,
	jsonDb: JsonService<Entity, Collection>,
	entityLinksFinder: entityLinksFinder<Entity>
): GraphDb<Entity, Collection> {
	let linksDb = graphDbLinksFactory(args)
	return new GraphDb<Entity, Collection>(jsonDb, linksDb, entityLinksFinder)
}

export function graphDbLinksFactory(args: jsonServiceFactoryArgs) {
	return new Links(
		new JsonService(
			GitApi(args.repo, args.authToken),
			linkfactory,
			(identiefier: string | number): string => {
				return `/clippings/${identiefier}.json`
			}
		)
	)
}
