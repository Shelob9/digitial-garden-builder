import { settingsApiServiceFactory } from './../../../serviceFactories'
import getSession from './../../../lib/getSession'
import { NextApiRequest, NextApiResponse } from 'next'
import factory from '../../../serviceFactories'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let { session } = await factory(req)
	res.json({ session })
}