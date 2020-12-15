import {  getSession } from '@garden-cms/note-api'
import { NextApiRequest, NextApiResponse } from 'next'
import createCorsMiddleWare from '../../lib/createCorsMiddleWare'

//Says Hi to Roy, or the logged in user.
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	const session = await getSession(req)
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Cache-Control', 's-maxage=17')
	res.status(200).json({ hi: session ? session.name : 'Roy' })
}
