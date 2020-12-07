import { getAccessTokenFromSession } from './../../lib/sessionUtil'
import { NextApiRequest, NextApiResponse } from 'next'
import { createOAuthAppAuth } from '@octokit/auth-oauth-app'

const clientId = process.env.GITHUB_ID
const clientSecret = process.env.GITHUB_SECRET

const auth = createOAuthAppAuth({
	clientId,
	clientSecret,
})

const scopes = `repo,user`
const state = `12345`
//@see https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity
const authRedirectUrl = () => {
	return `https://github.com/login/oauth/authorize?client_id=${clientId}&scopes=${scopes}&state=${state}`
}

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
//Says Hi to Roy, or the logged in user.
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req
	if (query && query.code) {
		const { code } = query
		let accessToken = await getAccessToken(code as string)
		const user = await getUser(accessToken)
		return res.json({ accessToken, user })
	}
	const oauthAuthentication = await auth({ type: 'oauth', code: '123456' })

	console.log(req.query)
	//console.log(oauthAuthentication)
	//res.setHeader('Cache-Control', 's-maxage=17')
	res.json({ oauthAuthentication })
}
