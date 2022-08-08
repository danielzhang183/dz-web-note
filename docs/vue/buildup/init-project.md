# Buildup Project From Scratch

## Init Project

I. install pnpm

```bash
npm install -g pnpm
```

II. use vite create project

```bash
pnpm create vite vite-starter --template vite+ts
cd vite-starter
```

III. create `.npmrc`

```text
shamefully-hoist=true
strict-peer-dependencies=false
```

IV. start the application

```bash
pnpm install
pnpm dev
```

## Config Lint

### eslint

I. install

```bash
pnpm add -D eslint @antfu/eslint-config
````

II. config `.eslintrc`

```json
{
  "extends": "@antfu"
}
```

III. add script for package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

IV. create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Auto Generated Router

I. install `vue-router`

```bash
pnpm add -D vue-router
```

II. install `vite-plugin-pages`

```bash
# https://github.com/hannoeru/vite-plugin-pages
# auto generate router based on file system
# all pages should put under src/pages by default

pnpm add -D vite-plugin-pages
```

III. config `vite.config.ts`

```ts
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    Pages(),
  ]
})
```

IV. refine `main.ts`

```ts
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
  .mount('#app')
```

V. config `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": [
      "vite/client",
      "vite-plugin-pages/client"
    ]
  }
}
```

VI. create `pages/index.vue`

```vue
<template>
  <div>
    <p>
      <a rel="noreferrer" href="https://github.com/danielzhang183/vite-starter" target="_blank">
        Vite Starter
      </a>
    </p>
    <p>
      <em>Opinionated Vite Starter Template</em>
    </p>
  </div>
</template>
```

VII. create `pages/[...all].vue`

```vue
<template>
  <div>
    Not Found
  </div>
</template>
```

## Auto Import Layouts

I. install

```bash
# https://github.com/JohnCampionJr/vite-plugin-vue-layouts
# auto generate router based on file system
# all layouts should put under src/layouts by default

pnpm add -D vite-plugin-vue-layouts
```

II. config `vite.config.ts`

```ts
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  plugins: [
    Layouts(),
  ]
})
```

III. refine `main.ts`

```ts
// import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
})
```

III. config `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-vue-layouts/client"
    ]
  }
}
```

IV. create `layouts/404.vue`

```vue
<template>
  <main>
    <RouterView />
    <button>back</button>
  </main>
</template>
```

V. refine `[...all].vue`

```vue
<route lang="yaml">
meta:
  layout: 404
</route>
```

## Auto Import Component

I. install

```bash
pnpm add -D unplugin-vue-components
```

II. config `vite-config.ts`

```ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      dts: true,
    }),
  ],
})
```

## Auto Import APIs

Pre

```bash
# https://github.com/vueuse/vueuse
# Collection of essential Vue Composition Utilities
pnpm add -D @vueuse/core
```

I. install

```bash
pnpm add -D unplugin-auto-import
```

II. config `vite.config.ts`

```ts
import AutoImport from 'unplugin-auto-import/vite'

// https://github.com/antfu/unplugin-auto-import
AutoImport({
  // global imports to register
  imports: [
    'vue',
    'vue/macros',
    'vue-router',
    '@vueuse/core',
  ],
  // Auto import for module exports under directories
  // by default it only scan one level of modules under the directory
  dirs: [
    './src/composables' // only root modules
  ],
  // Filepath to generate corresponding .d.ts file.
  // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
  // Set `false` to disable.
  dts: './auto-imports.d.ts',
  // Auto import inside Vue template
  // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
  vueTemplate: true,
})
```

## Config UnoCSS

Pre

```bash
pnpm add -D @iconify-json/carbon
```

I. install

```bash
pnpm add -D UnoCSS
pnpm add -D @unocss/reset
```

II. config `vite.config.ts`

```ts
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    // https://github.com/antfu/unocss
    Unocss(),
  ],
})
```

III. refine `main.ts`

```ts
import '@unocss/reset/tailwind.css'
import 'uno.css'
```

IV. create `unocss.config.ts`

```ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
```

## Config Editor

I. create `.editorconfig`

```text
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

II. config `.vscode/extension.json`

```json
{
  "recommendations": [
    "EditorConfig.EditorConfig"
  ]
}
```

## Config Deploy - Netlify

I. create `netlify.toml`

```text
[build.environment]
  # bypass npm auto install
  NPM_FLAGS = "--version"
  NODE_VERSION = "16"

[build]
  publish = "dist"
  command = "npx pnpm i --store=node_modules/.pnpm-store && npx pnpm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/manifest.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json"
```
