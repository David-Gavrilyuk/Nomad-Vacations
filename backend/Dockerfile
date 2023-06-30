FROM node:18-alpine3.16

RUN npm i -g nodemon
RUN npm i -g ts-node

WORKDIR /app/

COPY package*.json /app/

RUN npm i

COPY . /app/

ENV MYSQL_HOST=database
ENV MYSQL_PASSWORD=!11A7a3@dg

ENTRYPOINT npm start