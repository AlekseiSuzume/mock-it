FROM node:20.9.0 AS development

WORKDIR /app

COPY .env.docker ./.env
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npm run build
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 20000
