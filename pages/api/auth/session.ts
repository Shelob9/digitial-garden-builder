import getSession from './../../../lib/getSession'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	let session = getSession(req) ?? {}
	res.json({ session })
}
