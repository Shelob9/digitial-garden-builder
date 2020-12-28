import { JsonBased, JsonService } from './JsonService'
import { gitRepoDetails } from './../../types/git'
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

export function clippingServiceFactory(
	repo: gitRepoDetails,
	authToken: string
) {
	new JsonService(
		GitApi(repo, 'main', authToken),
		clippingFactory,
		clippingPathFactory
	)
}
