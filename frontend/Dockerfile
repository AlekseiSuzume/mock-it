#build
FROM node:20.11.0 AS development

WORKDIR /frontend/src/app

COPY package*.json ./

COPY . .

RUN npm install npm@latest -g
RUN npm install @angular/cli@latest -g
RUN npm install
RUN npm run build

EXPOSE 30000

