# demo-cep-foundation
This is the base image of the cep-demo-base repository. This is for
building the foundation docker image that the other branches will use.

## What You Get

The following is installed:

- Node 7.8.0
- [CNN Starter App](https://github.com/cnnlabs/cnn-starter-app)
- [CoreDev's CNN React Material library](https://github.com/turnercode/cnn-react-material)
- A user call `app` that can be used for permissions

## Running
```
docker build -t cep-demo-foundation .
```
