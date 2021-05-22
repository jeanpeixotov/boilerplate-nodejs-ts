FROM node:14.2.0-slim

WORKDIR /usr/src

COPY package.json ./
RUN yarn && yarn audit && yarn cache clean

COPY . .
EXPOSE 3000

CMD [ "yarn", "start"]