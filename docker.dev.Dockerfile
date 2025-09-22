FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY src ./src
COPY next.config.mjs .
COPY tsconfig.json .
COPY public ./public
COPY .env.development .

# Start Next.js in development mode
CMD npm run development dev
