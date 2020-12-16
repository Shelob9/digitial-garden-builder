import { userFromGithub, encodeUserJwt } from '@garden-cms/note-api'
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
	}).then(r => r.json())
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
	let { code, state } = req.query
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
			//Create a JWT token that has:
			// - Username. Not encrypted.
			// - Encrypted session with Github access token and repo details.
			// JWT encoding !== encryption. hmac is used inside.
			let token = encodeUserJwt(user.name, accessToken, {
				//@todo set this based on installed app
				owner: 'shelob9',
				repo: 'garden-cms-test-data',
			})
			console.log(state)
			if (state) {
				let redirect = `${state as string}?token=${token}&state=${state as string}`
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
