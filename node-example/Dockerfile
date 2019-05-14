FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
  # run nginx -t to check for syntex errors?

COPY . .

EXPOSE 3000

CMD ["npm", "start"]