FROM node:latest as build-stage

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Use official Nginx image as the base image
FROM nginx:latest as production-stage

COPY --from=build-stage usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]