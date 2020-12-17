
# Digital Garden Builder

Multi-player digital garden builder.

This is an experiment [Josh](https://joshpress.net) made.

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Shelob9/digitial-garden-builder)
![Server Tests](https://github.com/Shelob9/digitial-garden-builder/workflows/Server%20CI/badge.svg)

## Install

- Clone
  - `git clone git@github.com:Shelob9/garden-cms.git`
- Install with Yarn.
  - Do not use npm. Must use Yarn 1.x
  - `yarn`

## Generate HTML For One Digital Garden

- `yarn grow`

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
  - `yarn server`
  - Git API server.
- CLI
  - Does not exist yet.
  - Used to build sites and deploy to Github pages.
 