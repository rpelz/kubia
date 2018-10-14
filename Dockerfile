FROM node:8.12-alpine

RUN mkdir /app
WORKDIR /app
COPY app.js index.html package.json /app/

RUN yarn install

EXPOSE 8088

ENTRYPOINT ["node", "app.js"]
