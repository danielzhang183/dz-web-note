# All In One

## Pre

```bash
# https://github.com/pnpm/pnpm
npm i -g pnpm
# https://github.com/Rich-Harris/degit
pnpm i -g degit
```

## Download Template

```bash
# https://github.com/danielzhang183/vite-starter
degit danielzhang183/vite-starter vite-starter

# or

# https://github.com/danielzhang183/vite-lite-starter
degit danielzhang183/vite-lite-starter vite-starter
```

## Start Up

```bash
cd vite-starter
pnpm i
pnpm dev
```

## Advanced

```bash
# https://github.com/antfu/ni
pnpm i -g ni
# https://github.com/antfu/taze
pnpm i -g taze

cd vite-starter
# update deps
taze major -wir
# install deps
ni
# start up
pnpm dev
```
