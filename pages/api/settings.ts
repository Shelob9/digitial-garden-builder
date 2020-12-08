import factory from './../../serviceFactories'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { session, configService } = await factory(req)
	if (!session) {
		return res.status(403).json({ allowed: false, session })
	}
	let settings = await configService.getSettings()
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
			await configService.saveConfig(settings)
			res.status(201).json({
				settings,
			})
			break

		default:
			res.status(405).json({})
			break
	}
}
