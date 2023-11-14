FROM node:18.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.2.3

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
