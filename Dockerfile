FROM node:7.8.0

# Build environment variables
ENV APP_PATH=/home/app
ENV APP=$APP_PATH/demo-cep-base
ENV ENV_NODE=production

# Create a non-root user called app
RUN useradd --user-group --create-home --shell /bin/false app

# Copy the files needed to install the app
RUN mkdir -p $APP
COPY . $APP

RUN chown -R app:app $APP_PATH/*

USER app
WORKDIR $APP

RUN npm install
RUN npm install --only=development
RUN npm run build


USER root
CMD ["npm", "run", "start:prod"]