FROM node:latest as build-stage

ENV PATH /usr/src/node_modules/.bin:$PATH
ARG VITE_GATEWAY_URL
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL

COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage

COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /dist /usr/share/nginx/html

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]