FROM node:10.19.0 AS compile-image
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

FROM nginx:1.13
COPY --from=node /app/dist/sgm /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf