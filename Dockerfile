FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY models ./models
COPY public ./public
COPY app.js .

USER node

CMD ["npm", "start"]

EXPOSE 3000