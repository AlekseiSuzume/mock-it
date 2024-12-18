#build
FROM node:22.9.0 AS development

WORKDIR /frontend/src/app

COPY package*.json ./

COPY . .

RUN npm install npm@latest -g
RUN npm install @angular/cli@latest -g
RUN npm install
RUN npm run build

EXPOSE 21000
