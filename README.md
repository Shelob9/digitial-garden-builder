# Digital Garden Builder

Multi-player digital garden builder.

This is an experiment [Josh](https://joshpress.net) made.

## Install

- Clone
  - `git clone git@github.com:Shelob9/garden-cms.git`
- Install with Yarn.
  - Do not use npm. Must use Yarn 1.x
  - `yarn`

## Development

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
 