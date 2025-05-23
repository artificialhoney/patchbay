# <img src="packages/patchbay/bundle/assets/public-favicon.svg" alt="Patchbay" style="height: 2rem; margin-bottom: 0;" /> Patchbay [WIP](https://github.com/artificialhoney/patchbay)

> The brilliant [cables.gl](https://cables.gl) app on a state of the art full-stack platform. [CHECK IT OUT](https://patchbay.honeymachine.io)

## Stack

- Postgres DB
- Redis Cache
- Directus HeadlessCMS
- Patchbay App

## Installation

This is a `pnpm` workspace / monorepo.

```bash
pnpm i
```

## Development

Run the stack.

```bash
pnpm dev
```

Open <http://0.0.0.0:3000>.

## Production

Deploy the stack with `docker compose`:

```yaml
services:
  db:
    image: postgis/postgis:13-master
    container_name: patchbay_db
    # Required when running on platform other than amd64, like Apple M1/M2:
    # platform: linux/amd64
    volumes:
      - ${PATCHBAY_DATA_DIR:-~/directus}/database:/var/lib/postgresql/data
      - ${PATCHBAY_DB_VOLUME:-db}:/docker-entrypoint-initdb.d
    environment:
      POSTGRES_USER: "${PATCHBAY_POSTGRES_USER:-admin}"
      POSTGRES_PASSWORD: "${PATCHBAY_POSTGRES_PASSWORD:-patchbay}"
      POSTGRES_DB: "${PATCHBAY_POSTGRES_DB:-patchbay}"
  cache:
    image: redis:6
    container_name: patchbay_cache

  api:
    image: directus/directus:11.7.2
    container_name: patchbay_api
    volumes:
      - ${PATCHBAY_EXTENSIONS_VOLUME:-extensions}:/directus/extensions
      - ${PATCHBAY_SNAPSHOTS_VOLUME:-snapshots}:/directus/snapshots
      - ${PATCHBAY_DATA_DIR:-~/directus}/uploads:/directus/uploads
    environment:
      SECRET: "${PATCHBAY_SECRET:-patchbay_super_secret}"

      DB_CLIENT: "pg"
      DB_HOST: "db"
      DB_PORT: "5432"
      DB_DATABASE: "${PATCHBAY_POSTGRES_DB:-patchbay}"
      DB_USER: "${PATCHBAY_POSTGRES_USER:-admin}"
      DB_PASSWORD: "${PATCHBAY_POSTGRES_PASSWORD:-patchbay}"

      CACHE_ENABLED: "true"
      CACHE_AUTO_PURGE: "true"
      CACHE_STORE: "redis"
      REDIS: "redis://cache:6379"

      ADMIN_EMAIL: "${PATCHBAY_ADMIN_EMAIL:-admin@patchbay.io}"
      ADMIN_PASSWORD: "${PATCHBAY_ADMIN_PASSWORD:-patchbay}"

      PUBLIC_URL: "http://localhost:3000/patchbay"
      ROOT_REDIRECT: "/patch"
  app:
    container_name: patchbay_app
    image: artificialhoney/patchbay:latest
    ports:
      - 3000:3000
    volumes:
      - ${PATCHBAY_EXTENSIONS_VOLUME:-extensions}:/opt/patchbay/extensions
      - ${PATCHBAY_SNAPSHOTS_VOLUME:-snapshots}:/opt/patchbay/snapshots
      - ${PATCHBAY_DATA_DIR:-~/patchbay/app}/ops:/opt/patchbay/app
      - ${PATCHBAY_DB_VOLUME:-db}:/opt/patchbay/db
volumes:
  extensions:
  snapshots:
  db:

```

## Clean Code

Before you commit, run `prettier` and `eslint`:

```bash
pnpm format
pnpm lint
```

For commit hooking you can use [pre-commit](https://pre-commit.com/).

## LICENSE

The MIT License [MIT](LICENSE)

Copyright (c) 2025 honeymachine.io

Copyright (c) 2019-present undefined development

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

