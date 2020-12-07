import { decodeJwtToken } from './jwt'
import { NextApiRequest } from 'next'
const getSession = (req: NextApiRequest) => {
	let token = req.headers.authorization
	let user = decodeJwtToken(token)
	return user
}

export default getSession
