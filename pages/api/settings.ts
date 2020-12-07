import { settingsApiServiceFactory } from './../../serviceFactories'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const session = { accessToken: '11' }
	if (!session || !session.accessToken) {
		return res.status(403).json({ allowed: false, session })
	}
	let settingsService = await settingsApiServiceFactory(session.accessToken)
	let settings = await settingsService.getSettings()
	switch (req.method) {
		case 'GET':
			res.setHeader('Cache-Control', 's-maxage=300')
			res.status(200).json({ settings })
			break
		case 'POST':
			if (!session) {
				return res.status(403).json({ allowed: false })
			}
			settings = JSON.parse(req.body).settings
			await settingsService.saveConfig(settings)
			res.status(201).json({
				settings,
			})
			break

		default:
			res.status(405).json({})
			break
	}
}
