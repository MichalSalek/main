FROM node:lts-alpine

WORKDIR /app

ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY package.json ./
COPY package-lock.json ./
CMD npm run install

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .

# Start Next.js in development mode
CMD npm run dev
