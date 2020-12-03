import { settingsApiServiceFactory } from './../../serviceFactories'
import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=86400')
	const session = await getSession({ req })
	if (!session || !session.authToken) {
		return res.status(203).json({ allowed: false })
	}
	let settingsService = await settingsApiServiceFactory(session.authToken)
	let settings = await settingsService.getSettings()
	switch (req.method) {
		case 'GET':
			res.setHeader('Cache-Control', 's-maxage=300')
			res.status(200).json({ settings })
			break
		case 'POST':
			if (!session) {
				return res.status(203).json({ allowed: false })
			}
			settings = req.body.settings
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
