# Markdown CMS

Github-backed markdown minimalist CMS.

This is an experiment [Josh](https://joshpress.net) made. Really, I was trying to figure out some of NextJs' feature. Might be useful for other things.

You DO NOT want to deploy this as-is. There is login and authenticatio, but read the source. Proabably anyone could read/ write the repo you deploy this with.

## Development

- Clone
  - `git clone git@github.com:Shelob9/markdown-cms.git`
- Setup env variables
  - `cp .env.example .env`
  - [see next section](#env-variables)
creating-a-personal-access-token)
- Install
  - `yarn`
- Start
  - `yarn dev`
  - [You should see your files here](http://localhost:3202/cms/files)
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
- Next Auth
  - [Env Varibles](https://next-auth.js.org/configuration/options#environment-variables)
  - [Github Provider](https://next-auth.js.org/providers/google)
    - [Create a Github app](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app)
  - `GITHUB_ID`
  - `GITHUB_SECRET`
  - `NEXTAUTH_URL=http://localhost:3202/api/auth`
  - `JWT_SIGNING_PRIVATE_KEY`

## Idea and Ideas

The idea here is to create a very simple API and markdown UI for a CMS. I added a very basic front-end, but that may have been going too far. I belive it would be best to build this as a few components:

- Content API and types.
- Markdown editor
- React hook for consuming content.
- (maybe) Tailwind CSS blog post/index components

### What It Is Built With

- [NextJS](https://nextjs.org/)
  - [Next Auth](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [octokit.js](https://octokit.github.io/rest.js/v18)
  - [Great article on using Octokit with TypeScript](https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0) that helped a ton.

