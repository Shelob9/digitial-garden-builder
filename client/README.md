# Digital Garden Builder Client

Generates HTML for individual gardens.

## Development

- Setup env variables
  - `cp .env.example .env`
  - [see next section](#env-variables)
creating-a-personal-access-token)

These commands should be run from root of monorepo as `yarn client dev` most of the time:

- Install
  - `yarn`
- Start
  - `yarn dev`
- Test
  - `yarn test`

## Env Variables

- What repo to use for storing content.
  - `REPO_OWNER`: User or organization of the Github repo to use.
    - Example: `REPO_OWNER=shelob9`
  - `REPO_NAME`: Name of the Github repo to use.
    - Example: `REPO_NAME=garden-cms-test-data`
- Url for garden server
  - `NEXT_PUBLIC_GARDEN_SERVER_URL`
  - [Will be availble in the browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)
  - In production:
    - `NEXT_PUBLIC_GARDEN_SERVER_URL=https://garden-server.vercel.app`
  - In development:
    - `NEXT_PUBLIC_GARDEN_SERVER_URL=http://localhost:3000`
- Githun APP, client ID
  - `GITHUB_ID`
  - Used to create login redirect link
- Client URL
  - `CLIENT_LOGIN_REDIRECT`
  - URL that login will use to redirect back to client.
  - In development `CLIENT_LOGIN_REDIRECT=http://localhost:3000/login/after`
  
### What It Is Built With

- The UI for the note viewer started as a fork of [gatsby-theme-garden](https://github.com/mathieudutour/gatsby-digital-garden).
- [React MDX](https://mdxjs.com/) and [remark](https://github.com/remarkjs/remark)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
