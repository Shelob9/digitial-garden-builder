import { settingsApiServiceFactory } from '../../../services/serviceFactories'
import getSession from './../../../lib/getSession'
import { NextApiRequest, NextApiResponse } from 'next'
import factory from '../../../services/serviceFactories'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let { session } = await factory(req)
	res.json({ session })
}
