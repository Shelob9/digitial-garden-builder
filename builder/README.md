# Builder

Command Line Interface for [Digital Garden Builder](http://digitalgardenbuilder.app/).

This package is used in the [content repo template](https://github.com/Shelob9/garden-builder-content-template) to build static HTML for digital garden and deploy it to Github pages.

## Install

`npm i @digital-garden-builder/builder`

### Requirements

This package requires the following dependencies:

- Node
- git
- yarn

Make sure that the git repo you are running in has:

- A subdirectory called "notes"
- A garden.json file
- A client.env file

[See content repo for examples](https://github.com/Shelob9/garden-builder-content-template).

The git repo you are using must:

- Be hosted on Github
- Be authorized on a [Garden Server](https://docs.digitalgardenbuilder.app/notes/garden-server).

### Build Garden

- Build and deploy garden:
    - `npm garden`