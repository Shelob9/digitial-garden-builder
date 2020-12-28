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
	getClipping = async (id: string) => {
		return await this.jsonService.getItem(id)
	}
}

export function clippingServiceFactory(args: jsonServiceFactoryArgs) {
	new JsonService(
		GitApi(args.repo, 'main', args.authToken),
		clippingFactory,
		clippingPathFactory
	)
}
