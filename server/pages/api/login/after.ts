import { userFromGithub, encodeUserJwt } from '../../../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '../../../auth'

let auth = getAuth()

const getUser = async (accessToken: string) => {
	return fetch('https://api.github.com/user', {
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: `token ${accessToken}`,
		},
	}).then((r) => r.json())
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { code, state } = req.query
	console.log(state)
	try {
		const oauthAuthentication = await auth({
			type: 'oauth',
			code: code as string,
		})
		const accessToken = oauthAuthentication.token
		try {
			let user = await getUser(accessToken)
			user = userFromGithub(user)
			let token = encodeUserJwt(user.name, accessToken, {
				owner: 'shelob9',
				repo: 'garden-cms-test-data',
			})
			if (state) {
				let redirect = `${state as string}?token=${token}`
				return res.redirect(301, redirect)
			}
			res.json({ token })
		} catch (error) {
			console.log(error)
			res.status(500).json({ error })
		}
	} catch (error) {
		res.status(400).json({
			error: { name: error.name, status: error.status },
		})
	}
}
