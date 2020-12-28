import { gitRepoDetails } from './../../types/git'
import GitApi, { IGitApi } from './../lib/GitApi'
export type entityFactory<T> = (data: any) => T
export type collectionFactory<T> = (data: any) => T
export type entityPathFactory<T> = (identiefier: string | number) => string
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
}
