FROM node:14

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 100

CMD ["npm", "start"]