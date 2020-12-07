const scopes = `repo,user`
const state = `12345`;
const clientId = process.env.GITHUB_ID

//@see https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity
const authRedirectUrl = () => {
	return `https://github.com/login/oauth/authorize?client_id=${clientId}&scopes=${scopes}&state=${state}`
}


module.exports = {
    async redirects() {
      return [
        {
          source: '/login',
          destination: authRedirectUrl(),
          permanent: true,
        },
      ]
    },
  }