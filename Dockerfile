FROM node:20-alpine

ARG HEAD_COMMIT
ENV HEAD_COMMIT=$HEAD_COMMIT

WORKDIR /app
RUN chown -R node:node /app

USER node

ADD package.json /app/
ADD yarn.lock /app/

RUN yarn install

ADD . /app/

CMD ["yarn", "start"]