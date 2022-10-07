FROM node as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build



FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
