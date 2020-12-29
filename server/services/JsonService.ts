import { entityFactory } from './JsonService'
import { gitRepoDetails } from './../../types/git'
import GitApi, { IGitApi } from './../lib/GitApi'
export type entityFactory<T> = (data: any) => T
export type collectionFactory<T> = (data: any) => T
export type entityPathFactory<T> = (identiefier: string | number) => string

export type jsonServiceFactoryArgs = {
	repo: gitRepoDetails
	authToken: string
}
export class JsonService<Entity, Collection> {
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

	saveItem = async (
		identifier: string | number,
		item: Entity
	): Promise<Entity> => {
		return this.client
			.saveFile(
				JSON.stringify(item),
				this.entityPathFactory(identifier),
				`Save`
			)
			.then(() => {
				return item
			})
	}
}

export class JsonBased<Entity, Collection> {
	repo: gitRepoDetails
	jsonService: JsonService<Entity, Collection>
	constructor(jsonService: JsonService<Entity, Collection>) {
		this.jsonService = jsonService
	}

	entityFactory = (data: any) => {
		return this.jsonService.entityFactory(data)
	}

	collectionFactory = (data: any) => {
		return this.jsonService.collectionFactory(data)
	}

	entityPathFactory = (identiefier: string | number) => {
		return this.jsonService.entityPathFactory(identiefier)
	}
}
