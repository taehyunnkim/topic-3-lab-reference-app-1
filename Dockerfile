FROM node:18.6.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --ignore-scripts

COPY models ./models
COPY public ./public
COPY app.js  ./

USER node

CMD ["npm", "start"]