FROM node:14

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn --production=true

ADD . .

RUN yarn clone:core

RUN yarn build

CMD yarn start:prod
