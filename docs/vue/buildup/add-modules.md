# Add modules

## Add Axios

## Add Pinia

I. install

```bash
pnpm i pinia
```

II. config `main.ts`

```ts
const pinia = createPinia()
app.use(pinia)
```

III. create `stores/user.ts`

```ts
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
```

## Add NProgress

I. install

```bash
pnpm nprogress

pnpm -D @types/nprogress
```

II. config `main.ts`

```ts
import NProgress from 'nprogress'

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})
router.afterEach(() => NProgress.done())
```

III. refine `styles/main.css`

```css
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: rgb(13,148,136);
  opacity: 0.75;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
```

## Add i18n
