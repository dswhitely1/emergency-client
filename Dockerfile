FROM node:14-alpine as builder

WORKDIR /usr/src/app
ENV SKIP_PREFLIGHT_CHECK=true
ENV EXTEND_ESLINT=true
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./scripts/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "dameon off"]
