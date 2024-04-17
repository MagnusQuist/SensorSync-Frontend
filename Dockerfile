FROM node:latest as build-stage

ENV PATH /usr/src/node_modules/.bin:$PATH
ARG VITE_GATEWAY_URL
ENV VITE_GATEWAY_URL=$VITE_GATEWAY_URL

COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Use official Nginx image as the base image
FROM nginx:latest as production-stage

# Remove default nginx configurations
RUN rm -f /etc/nginx/conf.d/*

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Copy built Vue Vite application to Nginx web root directory
COPY --from=build-stage /dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]