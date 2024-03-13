FROM node:alpine

WORKDIR /ticketing/auth

COPY package.json .

RUN npm i

COPY . .

CMD [ "npm", "start" ]
