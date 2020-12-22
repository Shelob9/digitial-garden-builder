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
- `USE_REPO_PREFIX`
  - When using Github pages, without a custom domain, prefix asset urls with repo name.
  - [Article about fixing this](https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn)
- Url for garden server
  - `NEXT_PUBLIC_GARDEN_SERVER_URL`
  - [Will be availble in the browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)
  - In production:
    - `NEXT_PUBLIC_GARDEN_SERVER_URL=https://digitalgardenbuilder.app`
  - In development:
    - `NEXT_PUBLIC_GARDEN_SERVER_URL=http://localhost:3000`
- Public key for garden
  - `NEXT_PUBLIC_GARDEN_SERVER_PUBLIC_KEY`

  
### What It Is Built With

- The UI for the note viewer started as a fork of [gatsby-theme-garden](https://github.com/mathieudutour/gatsby-digital-garden).
- [React MDX](https://mdxjs.com/) and [remark](https://github.com/remarkjs/remark)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
