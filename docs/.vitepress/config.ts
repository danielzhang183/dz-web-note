import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    config: (md) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      md.use(require('markdown-it-task-lists'))
    },
  },
  lang: 'en-US',
  title: 'Web Notes',
  lastUpdated: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/vue/': sidebarVue(),
      '/algorithm/': sidebarAlgorithm(),
      '/typescript/': sidebarTypescript(),
      '/http/': sidebarHttp(),
      '/tool/': sidebarToolKit(),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/danielzhang183' },
    ],
    editLink: {
      pattern: 'git+https://github.com/danielzhang183/dz-web-note/edit/main/docs/:path',
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
    { text: 'Vue', link: '/vue/index', activeMatch: '/vue/' },
    { text: 'Algorithm', link: '/algorithm/index', activeMatch: '/algorithm/' },
    { text: 'Typescript', link: '/typescript/index', activeMatch: '/typescript/' },
    { text: 'HTTP', link: '/http/index', activeMatch: '/http/' },
    { text: 'ToolKit', link: '/tool/index', activeMatch: '/tool/' },
  ]
}

function sidebarVue() {
  return [
    {
      text: 'Source Code',
      collapsible: true,
      items: [
        { text: 'Core Engine', link: '/vue/core/core-engine' },
        { text: 'Core Patch Logics', link: '/vue/core/core-patch-logics' },
      ],
    },
    {
      text: 'Buildup From Scratch',
      collapsible: true,
      items: [
        { text: 'Vue3 + Vite3', link: '/vue/buildup/init-project' },
        { text: 'Add Modules', link: '/vue/buildup/add-modules' },
        { text: 'Add Docs', link: '/vue/buildup/add-docs' },
        { text: 'Add Playground', link: '/vue/buildup/add-playground' },
        { text: 'All In One', link: '/vue/buildup/all-in-one' },
      ],
    },
  ]
}

function sidebarAlgorithm() {
  return [
    {
      text: 'Algorithm',
      items: [
        { text: 'Data Structure', link: '/algorithm/data-structure' },
        { text: 'Common Algorithm', link: '/algorithm/common-algorithm' },
        { text: 'Used In Framework', link: '/algorithm/used-in-framework' },
        { text: 'FAQ', link: '/algorithm/interview' },
      ],
    },
  ]
}

function sidebarTypescript() {
  return [
    {
      text: 'Typscript',
      items: [
        { text: 'Basics', link: '/typescript/basics' },
        { text: 'Challenges', link: '/typescript/challenges' },
        { text: 'Tricks', link: '/typescript/tricks' },
      ],
    },
  ]
}

function sidebarHttp() {
  return [
    {
      text: 'HTTP',
      items: [
        { text: 'FAQ', link: '/http/FAQ' },
      ],
    },
  ]
}

function sidebarToolKit() {
  return [
    {
      text: 'ToolKit',
      items: [
        { text: 'Vite Plugins', link: '/tool/vite-plugins' },
        { text: 'Recommend Repos', link: '/tool/repos' },
      ],
    },
  ]
}
