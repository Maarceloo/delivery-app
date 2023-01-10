FROM node:16-alpine

WORKDIR /app-front

COPY package.json ./

RUN npm install --silent

COPY . .

CMD ["npm", "start"]