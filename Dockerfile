FROM node:12

# app directory
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "./src/index.js"]