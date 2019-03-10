FROM node:8.15

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

ARG PAINTINLEDS_ENV
RUN ./build.sh

EXPOSE 8080

CMD ["npm", "start"]
