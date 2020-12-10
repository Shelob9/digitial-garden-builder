import { decryptSession } from '../../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
import getSession from '../../lib/getSession'
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let session = getSession(req)
	let repo = {}
	if (session) {
		let _session = decryptSession(session)
		if (_session && _session.repo) {
			repo = _session.repo
		}
	}
	res.json({ session, repo })
}
