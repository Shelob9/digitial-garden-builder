import { decryptSession } from '../../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
import getSession from '../../lib/getSession'
import createCorsMiddleWare from '../../lib/createCorsMiddleWare'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const cors = createCorsMiddleWare(['GET', 'OPTIONS'])
	await cors(req, res)
	let session = getSession(req)
	let repo = {}
	let user = {
		name: '',
	}
	if (session) {
		let _session = decryptSession(session)
		if (_session && _session.repo) {
			repo = _session.repo
		}
		user.name = session.name
	}
	res.json({ session, repo, user })
}
