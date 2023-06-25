# graphql server

FROM node:16.20-bullseye

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4000

CMD ["npm", "start"]
