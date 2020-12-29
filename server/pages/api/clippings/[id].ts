import getSession from '../../../lib/getSession'
import factory from '../../../services/serviceFactories'
import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
import createCorsMiddleWare from '../../../lib/createCorsMiddleWare'
import { clippingServiceFactory } from '../../../services/ClippingsService'
/**
 * API endpoint for single clippings
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	let session = getSession(req)
	try {
		let { session, accessToken, repo } = await factory(req)
		let clippingServices = clippingServiceFactory({
			repo,
			authToken: accessToken,
		})
		switch (req.method) {
			case 'POST': {
				if (!session) {
					return res.status(203).json({ allowed: false })
				}
				let clipping = req.body.clipping
				clipping = await clippingServices.saveClipping(clipping)
				return res.status(201).json({
					clipping,
				})
				break
			}

			case 'GET':
			default:
				let { id } = req.query
				let clipping = await clippingServices.getClipping(id as string)
				res.setHeader('Cache-Control', 's-maxage=3600')
				return res.status(200).json({ clipping })
		}
	} catch (error) {
		return res.status(403).json({ error })
	}
}
