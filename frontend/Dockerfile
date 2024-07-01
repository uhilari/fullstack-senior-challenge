FROM node:20-alpine3.19 as build
COPY . .
RUN npm install
RUN npm run build

# etapa de producción
FROM nginx:1.27.0-alpine as prod
COPY --from=build /dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]