import { encodeUserJwt, userFromGithub } from '../../../services/UserService'
import { NextApiRequest, NextApiResponse } from 'next'
const clientId = process.env.GITHUB_ID
const clientSecret = process.env.GITHUB_SECRET
const scopes = `repo,user`
const state = `12345`

//@see https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
const getAccessToken = async (code: string) => {
	return fetch(
		`https://github.com/login/oauth/access_token?client_id=${clientId}&scopes=${scopes}&state=${state}&client_secret=${clientSecret}&code=${code}`,
		{
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
			},
			method: 'POST',
		}
	)
		.then((r) => r.json())
		.then((r) => {
			return r.access_token
		})
}

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
	const { query } = req
	if (query && query.code) {
		const { code } = query
		let accessToken = await getAccessToken(code as string)
		try {
			let user = await getUser(accessToken)
			user = userFromGithub(user)
			let token = encodeUserJwt(user.name, accessToken)
			return res.json({ token, user })
		} catch (error) {
			res.status(500).json({ error })
		}
	}
	return res.status(400).json({ message: 'No Code' })
}
