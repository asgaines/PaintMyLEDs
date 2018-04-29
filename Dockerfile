FROM node:6

WORKDIR /usr/src/app
COPY package.json .

RUN npm install

COPY . .
ENV MONGODB_URI "mongodb://db/leds"

EXPOSE 4200

CMD ["npm", "start"]
