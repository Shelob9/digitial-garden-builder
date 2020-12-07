import getSession from './../../../lib/getSession'
import { decodeJwtToken } from './../../../lib/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let user = getSession(req)
	res.json({ user })
}
