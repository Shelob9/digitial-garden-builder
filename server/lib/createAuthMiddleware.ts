import { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from './init-middleware'

export default function createAuthMiddleWare(methods: string[]) {
	return initMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
		throw new Error('Middles')
	})
}
