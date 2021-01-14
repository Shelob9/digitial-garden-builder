
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

### Workspaces

There are three workspaces. You can run commands in the workspaces by prefixing there name to the command. For example, to install a package in client workspace, you would run `yarn client add cross-env` or to build the server, you would run `yarn server build`

- [Client](./client/README.md)
  - `yarn client ...`
  - Generates HTML for each digital garden.
- [Server](./server/README.md)
  - `yarn server ...`
  - Git API server.
- [Builder](./builder/README.md)
  - The CLI
  - Used to build sites and deploy to Github pages.

### Using Workspaces For Development

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

## Release To NPM

```sh
yarn lerna publish
```

The [builder](https://www.npmjs.com/package/@digital-garden-builder/builder) is currently the only one being published.

