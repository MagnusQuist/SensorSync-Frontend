FROM node:alpine as builder

ENV PATH /usr/src/node_modules/.bin:$PATH
ARG VITE_GATEWAY_URL
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as production-build
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY --from=builder /dist /usr/share/nginx/html
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]