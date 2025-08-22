FROM node:22.9.0 AS development

WORKDIR /app

COPY .env.docker ./.env
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npm run build
RUN npx prisma generate

RUN apt-get update && apt-get install

EXPOSE 20000

FROM node:22.9.0 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/ .

EXPOSE 20000

CMD ["node", "dist/main"]
