# base image
FROM node:12.16.3 as node

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY restaurant-app/ /app
RUN npm install
# RUN npm run build

EXPOSE 4200

# FROM nginx:alpine
# COPY --from=node /app/dist/restaurant-client /usr/share/nginx/html
