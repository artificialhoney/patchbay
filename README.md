# patchbay

> Fork of the brilliant [cables.gl](https://cables.gl) web application to extend and build a new full-stack platform.

## Stack

- Postgis DB
- Redis Cache
- Directus HeadlessCMS
- Patchbay App

## Installation

This is a `pnpm` workspace / monorepo, find the packages [here](/packages).

```bash
pnpm i
```

## Development

Build the standalone application with `pnpm`:

```bash
pnpm run build:all
```

Run the standalone electron app:

```bash
pnpm run start:electron
```

Run the services stack:

```bash
pnpm run start:stack
```

Open <http://0.0.0.0:8055>.

## Clean Code

Before you commit, run `prettier` and `eslint`:

```bash
pnpm run format
pnpm run lint
```

For commit hooking you can use [pre-commit](https://pre-commit.com/)!

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
