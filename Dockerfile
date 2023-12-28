FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY . .

RUN npm run build

FROM nginx:stable-alpine

# Remove default static assets
WORKDIR /usr/share/nginx/html
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]