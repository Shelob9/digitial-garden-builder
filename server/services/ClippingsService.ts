import { JsonBased, JsonService, jsonServiceFactoryArgs } from './JsonService'
import GitApi from './../lib/GitApi'
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

export default class ClippingService extends JsonBased<
	Clipping,
	clippingCollection
> {
	index: {
		id: string | number
	}[]
	getClipping = async (id: string) => {
		return await this.jsonService.getItem(id)
	}

	saveClipping = async (clipping: any) => {
		clipping = this.entityFactory(clipping)
		await this.jsonService.saveItem(clipping.id, clipping)
		return clipping
	}

	fetchIndex = async () => {
		return this.jsonService.client
			.getFiles('/clippings', 'json')
			.then((r) => {
				this.index = r.map((file) => {
					let { name } = file
					let id = name.replace('.json', '')
					return {
						id,
					}
				})
				return this.index
			})
	}
}

export function clippingServiceFactory(args: jsonServiceFactoryArgs) {
	return new ClippingService(
		new JsonService(
			GitApi(args.repo, 'main', args.authToken),
			clippingFactory,
			clippingPathFactory
		)
	)
}
