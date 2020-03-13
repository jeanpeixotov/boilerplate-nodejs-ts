FROM node:10.15-slim

WORKDIR /usr/src

COPY package.json ./
RUN yarn && yarn audit && yarn cache clean

COPY . .
EXPOSE 3000

CMD [ "yarn", "start"]