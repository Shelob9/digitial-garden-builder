# Digital Garden CMS
 
Client for Digital Garden CMS

## Development

- Setup env variables
  - `cp .env.example .env`
  - [see next section](#env-variables)
creating-a-personal-access-token)
- Install
  - `yarn`
- Start
  - `yarn dev`
- Test
  - `yarn test`

### Env Variables

This is documentation of the environment variables required to make this work. It also explains some of how this works.

- What repo to use for storing content.
  - `REPO_OWNER`: User or organization of the Github repo to use.
    - Example: `REPO_OWNER=shelob9`
  - `REPO_NAME`: Name of the Github repo to use.
    - Example: `REPO_NAME=garden-cms-test-data`
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

### Notes On Security

So the user token can contain encrypted data. To decrypt that data you need the iv, which is transmitted with the encrypted data and you need the value of the environment varible `ENCRYPT_KEY` to decrypt the data. Also, only run this on HTTPS.

If the cookie is stolen, you could use it to update the same data that this app updates. But not gain access to other repos or worse. If the attacker decrypted the stolen data, that would be very bad.

I need to:

- Switch to a Github app so the access token has the least privileges possible.
  - Github oAuth token scopes can not to be set per repo.
  - Need read/ write access for the repo being used for storage.
- Get someone else to review the encryption idea.

### What It Is Built With

- The UI for the note viewer started as a fork of [gatsby-theme-garden](https://github.com/mathieudutour/gatsby-digital-garden).
- [React MDX](https://mdxjs.com/) and [remark](https://github.com/remarkjs/remark)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [octokit.js](https://octokit.github.io/rest.js/v18)
  - [Great article on using Octokit with TypeScript](https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0) that helped a ton.
