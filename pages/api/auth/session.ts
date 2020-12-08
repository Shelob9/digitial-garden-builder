import { userJwtData, decryptSession } from './../../../UserService'
import getSession from './../../../lib/getSession'
import { NextApiRequest, NextApiResponse } from 'next'
const getAccessTokenFromSession = (
	sessionData: userJwtData | undefined
): string | false => {
	if (!sessionData) {
		return false
	}
	let session = decryptSession(sessionData)
	return session.accessToken ?? false
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let session = getSession(req)
	let t = getAccessTokenFromSession(session)
	res.json({ user: session, t })
}
