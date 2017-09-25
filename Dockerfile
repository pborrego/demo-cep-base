FROM registry.services.dmtio.net/pborrego-demo:0.2.0-foundation.18
 
# Build environment variables
ENV APP_PATH=/home/app
ENV APP=$APP_PATH/demo-cep-base

# Copy the files needed to install the app
RUN mkdir -p $APP
COPY . $APP

RUN chown app:app $APP
RUN chown -R app:app $APP/src
RUN chown -R app:app $APP/server.js

USER app
WORKDIR $APP

RUN npm run lint
RUN npm test
RUN npm run build

USER root
CMD ["npm", "run", "start:prod"]
