import factory from '../../services/serviceFactories'
import { NextApiRequest, NextApiResponse } from 'next'
import createCorsMiddleWare from '../../lib/createCorsMiddleWare'

import { clippingServiceFactory } from '../../services/ClippingsService'
/**
 * API endpoints for clipping index and create.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'PUT', 'OPTIONS'])
	await cors(req, res)

	try {
		let { session, accessToken, repo } = await factory(req)
		let clippingServices = clippingServiceFactory({
			repo,
			authToken: accessToken,
		})
		switch (req.method) {
			case 'GET':
				res.setHeader('Cache-Control', 's-maxage=3600')
				let index = await clippingServices.fetchIndex()
				return res.status(200).json({ index })
			case 'PUT':
				if (!session) {
					return res.status(203).json({ allowed: false })
				}
				let clipping = req.body.clipping
				clipping = await clippingServices.saveClipping(clipping)
				return res.status(201).json({
					clipping,
				})
			default:
				return res.status(405).json({})
		}
	} catch (error) {
		return res.status(500).json({ error })
	}
}
