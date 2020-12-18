import { Garden, Gardener } from './../../types'
import { NextApiRequest } from 'next'
import GardenerService from '../services/GardenerService'
export const getPublicKeyFromRequest = (
	req: NextApiRequest
): string | undefined => {
	if (req.headers['x-garden-public']) {
		return req.headers['x-garden-public'] as string
	}
	return undefined
}

const getRepoFromHeader = async (
	req: NextApiRequest,
	service: GardenerService
): Promise<Garden> => {
	let header = getPublicKeyFromRequest(req)
	return new Promise(async (resolve, reject) => {
		if (header) {
			let garden = await service.getGarden(header)
			resolve(garden)
		}
		reject()
	})
}
export default getRepoFromHeader
