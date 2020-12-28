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
		this.jsonService.client.saveFile(
			JSON.stringify(this.index),
			this.indexPath,
			`Added node ${node.id}`
		)
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

class GraphDb<Entity, Collection> {
	linksDb: Links
	dataDb: JsonService<Entity, Collection>
	constructor(dataDb: JsonService<Entity, Collection>, linksDb: Links) {
		this.dataDb = dataDb
		this.linksDb = linksDb
	}

	getItem = async (id: string) => {
		let item = await this.dataDb.getItem(id)
		//get links?
		return item
	}

	addItem = async (item: Entity) => {
		item = await this.dataDb.saveItem(
			//@ts-ignore
			item.id,
			item
		)
		//add links
		return item
	}
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
