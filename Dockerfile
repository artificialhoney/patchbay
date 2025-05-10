ARG NODE_VERSION=20.19.1

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application files to the working directory
COPY .. ./

# Clean node_modules
RUN rm -rf node_modules && pnpm -r exec rm -rf node_modules

## Install dependencies
RUN pnpm install --shamefully-hoist

# Build the extension bundle
RUN pnpm run -r --filter @patchbay/bundle build

# Build the application
RUN pnpm run -r --filter @patchbay/app build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Install dumb init
RUN apt-get update && apt-get install -y ca-certificates dumb-init

WORKDIR /opt/patchbay

# Copy static assets
COPY --from=build /app/assets/api api
COPY --from=build /app/assets/db db
# Copy the output from the build stage to the working directory
COPY --from=build /app/packages/patchbay/app/.output app
COPY --from=build /app/packages/patchbay/bundle api/extensions

# Copy entrypoint and make executable
COPY --from=build /app/entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Define environment variables
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# or if you use --rewrite or other cli flags
# ENTRYPOINT ["dumb-init", "--rewrite", "2:3", "--"]

CMD ["/entrypoint.sh"]
