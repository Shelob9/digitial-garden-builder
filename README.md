
# Digital Garden Builder

Multi-player digital garden builder.

This is an experiment [Josh](https://joshpress.net) made.

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Shelob9/digitial-garden-builder)
![Tests](https://github.com/Shelob9/digitial-garden-builder/workflows/Tests/badge.svg)

## Install

- Clone
  - `git clone git@github.com:Shelob9/digital-garden-builder.git`
- Install with Yarn.
  - Do not use npm. Must use Yarn 1.x
  - `yarn`
  - `yarn lerna bootstrap`

## Development

- Start server and client
  - `yarn dev`
- Start server:
  - `yarn server dev`
- Start client:
  - `yarn client dev`
- Test server:
  - `yarn test dev`
- Test client:
  - `yarn test dev`

## Workspaces

- Client
  - `yarn client ...`
  - Generates HTML for each digital garden.
- Server
  - `yarn server ...`
  - Git API server.
- Builder
  - The CLI
  - Used to build sites and deploy to Github pages.

## Release To NPM

```sh
yarn lerna publish
```

The [builder](https://www.npmjs.com/package/@digital-garden-builder/builder) is currently the only one being published.

