FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
CMD npm run install

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY .env.development .

# Start Next.js in development mode
CMD npm run development dev
