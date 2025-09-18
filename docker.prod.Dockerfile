FROM nginx:alpine

WORKDIR /app

ADD out/ /usr/share/nginx/html
