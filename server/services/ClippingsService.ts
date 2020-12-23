import { gitRepoDetails } from './../../types/git'
import GitApi, { IGitApi } from './../lib/GitApi'
import { clippingCollection, Clipping } from './../../types/clippings'
import { v4 as uuid } from 'uuid'

function clippingFactory<Clipping>(data: any): Clipping {
	return data.map(
		({ id, title, content, link, created_at, authorName, authorUrl }) => {
			id = id ?? uuid()
			return {
				id,
				title,
				content,
				link,
				created_at,
				authorName,
				authorUrl,
			}
		}
	)
}

function clippingPathFactory(identiefier: string | number): string {
	return `/clippings/${identiefier}.json`
}
type entityFactory<T> = (data: any) => T
type collectionFactory<T> = (data: any) => T
type entityPathFactory<T> = (identiefier: string | number) => string

class JsonService<Entity, Collection> {
	client: IGitApi
	entityFactory: entityFactory<Entity>
	entityPathFactory: entityPathFactory<Entity>
	collectionFactory: collectionFactory<Collection>
	constructor(client, entityFactory, entityPathFactory) {
		this.client = client
		this.entityFactory = entityFactory
		this.entityPathFactory = entityPathFactory
	}

	getItem = async (identifier: string | number): Promise<Entity> => {
		return this.client
			.getFile(this.entityPathFactory(identifier))
			.then(({ content }) => {
				let json = JSON.parse(content)
				return this.entityFactory(json)
			})
	}
}

export default class ClippingService {
	repo: gitRepoDetails
	JsonService: JsonService<Clipping, clippingCollection>
	constructor(repo: gitRepoDetails, authToken: string) {
		this.JsonService = new JsonService(
			GitApi(repo, 'main', authToken),
			clippingFactory,
			clippingPathFactory
		)
	}

	getClipping = async (id: string) => {
		return await this.JsonService.getItem(id)
	}
}
