# demo-cep-base
Demo of react toolbox and cnn starter to form the basis for CEP projects.

## Install
```
npm install
```

## Running

### Locally
```
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
