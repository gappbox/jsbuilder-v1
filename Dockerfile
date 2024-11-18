FROM node:22.11.0 as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/local/app/build /usr/share/nginx/html

EXPOSE 80