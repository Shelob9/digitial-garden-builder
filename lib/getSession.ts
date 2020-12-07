import { decodeJwtToken } from './jwt'
import { NextApiRequest } from 'next'
import Cookies from 'universal-cookie'

const getSession = (req: NextApiRequest) => {
	let token = ''
	if (req.headers.authorization) {
		token = req.headers.authorization
	} else {
		const cookies = new Cookies(req ? req.headers.cookie : null)
		token = cookies.get('_garden_token')
	}
	let user = decodeJwtToken(token)

	return user
}

export default getSession