# Garden

Github-backed markdown CMS for digital gardens.

This is an experiment [Josh](https://joshpress.net) made. 

## Development

- Clone
  - `git clone git@github.com:Shelob9/garden-cms.git`
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

- What repo to use
  - The API token created in the next step must have read/write permissions for this.
  - `GIT_REPO_OWNER=shelob9`
  - `GIT_REPO_REPO=meadow-foam`
- Github API token
  - [Github Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/)
  - `GITHUB_API_TOKEN`
- Github oAuth App
  - [Create a Github app](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app)
  - `GITHUB_ID`
  - `GITHUB_SECRET`
- Encryption and Decryption
  - `ENCRYPT_KEY` - Must be 32 charcters long.

### What It Is Built With

- [NextJS](https://nextjs.org/)
  - [Next Auth](https://next-auth.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [octokit.js](https://octokit.github.io/rest.js/v18)
  - [Great article on using Octokit with TypeScript](https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0) that helped a ton.
