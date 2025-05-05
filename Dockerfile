FROM node:20-alpine AS builder
RUN corepack enable
RUN mkdir /opt/app
WORKDIR /opt/app
COPY . ./
RUN rm -rf node_modules packages/*/*/node_modules
RUN rm -rf packages/*/*/dist
RUN pnpm install --frozen-lockfile
RUN pnpm run --filter @patchbay/bundle build
RUN pnpm run --filter @patchbay/ui build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /directus/extensions
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /opt/app/packages/patchbay/ui/dist /usr/share/nginx/html
COPY --from=builder /opt/app/packages/patchbay/bundle /directus/extensions/patchbay

CMD ["nginx", "-g", "daemon off;"]
