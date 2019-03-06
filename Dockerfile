FROM node:8.15

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

RUN ./node_modules/@angular/cli/bin/ng build --output-path dist

EXPOSE 8080

CMD ["npm", "start"]
