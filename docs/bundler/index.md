# Bundler

## ESM & CJS

### Blocking

I. **you can’t use ESM packages in CJS.**

if you do:

```js
// in CJS
const pkg = require('esm-only-package')
```

you will receive the following error

```txt
Error [ERR_REQUIRE_ESM]: require() of ES Module esm-only-package not supported.
```

**cause:**

ESM is asynchronous by nature, meaning you can’t import an async module in synchronous context that `require` is for.

**solution:**

use ESM package in CJS using `dynamic import()`:

```ts
// in CJS
const { default: pkg } = await import('esm-only-package')
```

II. **Content Misaligment**

**cause:**

In ESM, there is NO `__dirname`, `__filename`, `require`, `require.resolve`.

**solution:**

Instead, you will need to use `import.meta.url` and also do some convertion to get the file path string.

For `__dirname` and `__filename`, you can use

```ts
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
```

For `require` and `require.resolve`, you can use

```ts
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
```

### Bundling

**Pre**

Node allows you to have those two formats in a single package at the same time. With the new [exports](https://nodejs.org/api/packages.html#conditional-exports) field in `package.json`, you can now specify multiple entries to provide those formats conditionally. Node will resolve to the version based on user’s or downstream packages environment.

```json
{
  "name": "my-cool-package",
  "exports": {
    ".": {
      "require": "./index.cjs", // CJS
      "import": "./index.mjs" // ESM
    }
  }
}
```

you can ship both esm & cjs packages at one time by the following tool:

- [tsup](#tsup)
- [unbind](#unbind)

## tsup

[tsup](https://github.com/egoist/tsup) power by [esbuild](https://github.com/evanw/esbuild). it not only super easy to use but also incredible fast. The features zero-config building for TypeScript project. The usage is like:

```bash
tsup src/index.ts
```

it can both generate esm & cjs for you.

```bash
tsup src/index.ts --format esm,cjs
```

Here is template of `package.json` using `tsup`

```json
{
  "name": "pkg-name",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "watch": "npm run build -- --watch src",
    "prepublishOnly": "npm run build"
  }
}
```

you can also create `tsup.config.ts` file in the root

```ts
// ts.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  shims: true,
  clean: true,
})
```

## unbind

If we say `tsup` is a minimal bundler for TypeScript, [unbuild](https://github.com/unjs/unbuild) by the [@unjs org](https://github.com/unjs) is a more generalized, customizable and yet powerful. To use it, we create `build.config.ts` file in the root

```ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index'
  ],
  declaration: true, // generate .d.ts files
})
```

The usage is like:

```bash
unbuild
```
it will generate both esm & cjs for you by default!

### Stubbing -- watch mode

power by [jiti](https://github.com/unjs/jiti) -- another `@unjs org` package.

```bash
unbuild --stub
```

### Bundleless build

power by [mkdist](https://github.com/unjs/mkdist) -- another `@unjs org` package.

- handles static assets and file-to-file transpiling
- keep the structure of your source code
- made easy for importing submodules on-demand to optimizing performance and more

```ts
// build.config.ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    // bundling
    'src/index',
    // bundleless, or just copy assets
    { input: 'src/components/', outDir: 'dist/components' },
  ],
  declaration: true,
})
```

Here is template of `package.json` using `unbind`

```json
{
  "name": "pkg-name",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/index.cjs",
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "unbuild",
    "dev": "unbuild --stub",
    "prepublishOnly": "npm run build"
  }
}
```

monorepo

root `package.json`

```json
{
  "name": "@pkg-name/monorepo",
  "type": "module",
  "version": "0.0.0",
  "private": true,
  "packageManager": "pnpm@7.12.0",
  "scripts": {
    "build": "rimraf packages/*/dist && pnpm -r --filter=./packages/* run build",
    "dev": "nr stub",
    "stub": "pnpm -r --filter=./packages/* --parallel run stub",
    "deploy": "nr build && npm -C playground run build",
    "lint": "eslint --cache .",
    "lint:fix": "nr lint --fix",
    "play": "npm -C playground run dev",
    "release": "bumpp package.json packages/**/package.json",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:update": "vitest -u",
    "test:ci": "nr build && nr typecheck && nr lint && nr test"
  }
}
```

sub-package `package.json`

```json
{
  "name": "@pkg-name/sub-pkg",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.js",
      "import": "./dist/index.mjs"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "watch": "nr build -- --watch src --out-dir .",
    "dev": "nr watch & live-server --open=/play"
  }
}
```

### Enable CJS briage

```ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  cjsBridge: true, // <--
})
```

## Common package.json

```json
{
  "name": "pkg-name",
  "type": "module",
  "version": "0.0.0",
  "packageManager": "pnpm@7.12.0",
  "description": "",
  "author": "Daniel Zhang",
  "license": "MIT",
  "homepage": "https://github.com/danielzhang183/pkg-name#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/danielzhang183/pkg-name.git"
  },
  "bugs": "https://github.com/danielzhang183/pkg-name/issues",
  "keywords": [],
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist/index.mjs"
    }
  },
  "main": "./dist/index.mjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "typesVersions": {
    "*": {
      "*": [
        "./dist/*",
        "./dist/index.d.ts"
      ]
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "unbuild",
    "dev": "unbuild --stub",
    "lint": "eslint .",
    "prepublishOnly": "nr build",
    "release": "bumpp && npm publish",
    "start": "esno src/index.ts",
    "test": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@antfu/eslint-config": "^0.27.0",
    "@antfu/ni": "^0.18.0",
    "@antfu/utils": "^0.5.2",
    "@types/node": "^18.7.18",
    "bumpp": "^8.2.1",
    "eslint": "^8.23.1",
    "esno": "^0.16.3",
    "pnpm": "^7.12.0",
    "rimraf": "^3.0.2",
    "typescript": "^4.8.3",
    "unbuild": "^0.8.11",
    "vite": "^3.1.2",
    "vitest": "^0.23.4"
  }
}
```
