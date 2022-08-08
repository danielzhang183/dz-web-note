# Add Playground

## Create `pnpm-workspace.yaml`

```yaml
packages:
  - playground
```

## Use `vite` create project

```bash
pnpm create vite playground --template vue-ts
```

## Config `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

## Config main(outer) `package.json`

```json
{
  "scripts": {
    "play": "pnpm -C playground run dev"
  }
}
```

## Run playground

```bash
pnpm run play
```
