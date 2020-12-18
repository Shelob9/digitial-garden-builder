import { userFromGithub, encodeUserJwt } from '../../../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '../../../auth'
import GardenerService from '../../../services/GardenerService'

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
	console.log(req.query)
	let { code, state } = req.query
	let _gardenerService = new GardenerService()
	try {
		let garden = await _gardenerService.getGarden(state as string)
		const oauthAuthentication = await auth({
			type: 'oauth',
			code: code as string,
		})
		const accessToken = oauthAuthentication.token
		try {
			let user = await getUser(accessToken)
			user = userFromGithub(user)
			//Is this the owner of garden?
			if (user.id != garden.gardener.github.id) {
				//No? return error
				return res
					.status(403)
					.json({ error: `Invalid user`, user: user.id })
			}
			try {
				//Create a JWT token that has:
				// - Username. Not encrypted.
				// - Encrypted session with Github access token and repo details.
				// JWT encoding !== encryption. hmac is used inside.
				let token = encodeUserJwt(user.name, accessToken, garden.repo)
				if (state) {
					let redirect = `${garden.afterLoginUrl}?token=${token}`
					return res.redirect(301, redirect)
				}
				return res.json({ token, state })
			} catch (error) {
				console.log(error)
				return res.status(500).json({ error, state })
			}
		} catch (error) {
			console.log(error)
			return res
				.status(403)
				.json({ error, message: 'Garden not found', state })
		}
	} catch (error) {
		return res.status(400).json({
			error: { name: error.name, status: error.status },
		})
	}
}
