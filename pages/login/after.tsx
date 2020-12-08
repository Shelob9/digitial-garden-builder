import useUserToken from "../../hooks/useUserCookie";
import { encodeUserJwt, userFromGithub } from "../../UserService";
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
export async function getServerSideProps ({req,res,query}){
	let token = 'tokens';
	if (query && query.code) {
		const { code } = query
		let accessToken = await getAccessToken(code)
		try {
			let user = await getUser(accessToken)
			user = userFromGithub(user);
			let token = encodeUserJwt(user.name, accessToken)
			res.setHeader('Set-Cookie', `_garden_token=${token} `);
			return {
				props: {
					token,
				}
			  }
		} catch (error) {
			console.log(error);
			res.status(500).json({ error })
		}
	}
    
    return {
      props: {
        token
      }
    }
  }
  
export default function After(props) {
	const { token } = useUserToken({ token: props.token });
	return (<div>Logged In with token {token}</div>)
};
