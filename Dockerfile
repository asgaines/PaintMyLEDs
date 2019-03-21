FROM node:8.15

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY angular.json angular.json
COPY tsconfig.json tsconfig.json
COPY tslint.json tslint.json
COPY build.sh build.sh
COPY src src

ARG PAINTINLEDS_ENV
RUN ./build.sh

EXPOSE 8080

CMD ["npm", "start"]
