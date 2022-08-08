# Add Docs

## Create `pnpm-workspace.yaml`

```yaml
packages:
  - docs
```

## Initialize Docs

I. Create & change into a new directory

```bash
mkdir docs && cd docs
```

II. Then, initialize with your preferred package manager.

```bash
pnpm init
```

III. Add VitePress (& Vue) as dev dependencies for the project.

```bash
pnpm add -D vitepress
```

IV. Create first document

```bash
echo 'Hello VitePress' > index.md
```

## Config `package.json`

```json
{
  "scripts": {
    "dev": "vitepress dev .",
    "build": "vitepress build .",
    "serve": "vitepress serve ."
  }
}
```

## Config main(outer) `package.json`

```json
{
  "scripts": {
    "docs:dev": "pnpm -C docs run dev"
  }
}
```

## Run docs dev

ensure at root project

```bash
pnpm run docs:dev
```

## Configuration

```text
├─ docs
│  ├─ .vitepress
│  │  └─ config.ts
│  ├─ typescript
│  │  └─ index.md
│  │  └─ challenges.md
│  │  └─ tricks.md
│  └─ index.md
│  └─ package.json
```

I. Create & config `.vitepress/config.ts`

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Web Notes',
  lastUpdated: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/typescript/': sidebarTypescript(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/danielzhang183' },
    ],
    editLink: {
      pattern: 'git+https://github.com/danielzhang183/vite-starter/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Dylan Zhang',
    },
  },
})

function nav() {
  return [
    { text: 'Typescript', link: '/typescript/index', activeMatch: '/typescript/' },
  ]
}

function sidebarTypescript() {
  return [
    {
      text: 'Typscript',
      collapsible: true,
      items: [
        { text: 'Challenges', link: '/typescript/challenges' },
        { text: 'Tricks', link: '/typescript/tricks' },
      ],
    },
  ]
}
```

II. modify `index.md`

```yaml
---
layout: home

hero:
  name: Web Notes
  text: frontender needy knowledge
  tagline: this is the way...
  actions:
    - theme: brand
      text: Typescript
      link: /typescript/index

features:
  - title: Typescript
    details: javascript with type checking
---
```
