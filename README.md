# Prototype Tag Manager

A prototype for the tag manager UI. This will manage the tags generated
by Magnet for article and vidoes. Allowing the user to choose which tags
are seen per resource. Allows for transcript modification as well for
videos.

## Install
```
git checkout foundation
npm install
```

## Running

### Locally
```
git checkout prototype-tag-manager
npm start
```

Wait to see the message: `webpack built ...` then navigate to http://localhost:5050.

### Production
```
npm start:prod
```


## Environment Variables

| Variable    | Default [possible values] | Description                                                                                                   |
|-------------|---------------------------|---------------------------------------------------------------------------------------------------------------|
| `BABEL_ENV` | [server]                  | Tells Babel if the code is running in the server context. Only needed when running `npm run start:prod`.      |
| `NODE_ENV`  | [production]              | When running in production this needs to be set as production. Only needed when running `npm run start:prod`. |
| `PORT`      | 5050                      | The port that the server runs on.                                                                             |
