FROM node:12-alpine

WORKDIR /app
RUN chown -R node:node /app

USER node

ADD package.json /app/
ADD yarn.lock /app/

RUN yarn install

ADD . /src/

CMD ["yarn", "start"]