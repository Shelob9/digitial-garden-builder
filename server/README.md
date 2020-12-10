# API Server For Digital Garden Builder

## Development

- Setup env variables
  - `cp .env.example .env`
  - [see next section](#env-variables)
creating-a-personal-access-token)

These commands should be run from root of monorepo as `yarn server dev` most of the time:

- Install
  - `yarn`
- Start
  - `yarn dev`
- Test
  - `yarn test`

## Env Variables

- Github API token
  - [Github Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/)
  - `GITHUB_API_TOKEN`
  - Should be created with `repo:status` and `public_repo` scopes only.
  - This is used as the access token for Github API when user is NOT logged in.
- Github oAuth App
  - [Create a Github app](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app)
  - `GITHUB_ID`
  - `GITHUB_SECRET`
  - It would be BETTER to use a Github app, not an oAuth app.
  - JOSH: Do that next(ish)!
- Encryption and Decryption
  - `ENCRYPT_KEY` - Must be 32 charcters long.
  - Used to encrypt and decrypt the session details that are encoded in the JWT token.
- JWT
  - `JWT_SECRET_KEY`
  - Right now, the JWT token is set in a cookie, `_garden_token` and it can be sent in the `Authorization` header of HTTP requests to the application.
  - The data property of the JWT should include:
    - `name`: The current user's display name.
    - `session`: Object with:
      - `iv`: The initialization vector used to encrypt the session.
      - `content`: The encrypted session content.

## Notes On Security

So the user token can contain encrypted data. To decrypt that data you need the iv, which is transmitted with the encrypted data and you need the value of the environment varible `ENCRYPT_KEY` to decrypt the data.

That is a secret that is stored in encrypted environment variables. Also, only run this on HTTPS.

If the cookie is stolen, you could use it to update the same data that this app updates. But not gain access to other repos or worse. If the attacker decrypted the stolen data, they would get a Github access token. It has privaledges, for the repos the application is added to.

### What It Is Built With

- [NextJS](https://nextjs.org/)
  - There is only one HTML page. Using Next was a quick way to get the API routes working with Vercel.
- [TypeScript](https://www.typescriptlang.org/)
- [octokit.js](https://octokit.github.io/rest.js/v18)
  - [Great article on using Octokit with TypeScript](https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0) that helped a ton.
