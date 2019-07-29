# ![alt text](https://openlabyrinth.sgul.ac.uk/images/openlabyrinth-header.png) Olab-4


## Overview

Fourth version of Open Labyrinth project.

## Important v0.4.0 Information
- "react-digraph" package was injected in Olab.
- Structure of the project was refactored.

## Launch

To kick off development of the project:
```bash
npm start
```

To make production build:
```bash
npm build
```

## Production runbook

Clone your repository and Open the folder
```bash
git clone <remote_url> <directory_folder> && cd <directory_folder>
```

Run downloading of npm modules
```bash
npm i
```

Run the generating of the production build
```bash
API_URL=<api_url> PUBLIC_URL=<subpath_url> npm run build
```
env variables are optional, and default values will be get from `./env/.env.production`

Copy/move the `*` from `./build` folder to web hosts directory
```bash
mv ./build/* /var/www/olab4/
```

So your application will be available by `/var/www/olab4/index.html`

## Releases

In the root placed files `release_<N>.patch` and relative to npm git tag