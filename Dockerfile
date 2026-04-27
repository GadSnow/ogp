# Étape 1 : build Angular
FROM node:20-alpine AS build

WORKDIR /app


COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --prod

# Étape 2 : serveur Nginx
FROM nginx:alpine

COPY --from=build /app/dist/ogp/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]