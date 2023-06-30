FROM node:18-alpine3.16

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

COPY . /app/

ENTRYPOINT npm start