FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json /app/



COPY . /app/
RUN npm i
ENTRYPOINT npm start