import { decodeJwtToken } from './../../../lib/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let token = req.headers.authorization
	let user = decodeJwtToken(token)
	res.json({ user })
}
