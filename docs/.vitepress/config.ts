import { defineConfig } from 'vitepress'

export default defineConfig({
  markdown: {
    config: (md) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      md.use(require('markdown-it-task-lists'))
    },
  },
  title: 'Web Notes',
  lang: 'zh-CN',
  description: 'Sort of my recently learning notes',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: 'Vue3',
        items: [
          { text: 'Source Code', link: '/vue/source-code' },
        ],
      },
      { text: 'Algorithm', link: '/algorithm/index' },
    ],
    sidebar: [
      {
        text: 'Source Code',
        items: [
          { text: 'Core Engine', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Algorithm',
        items: [
          { text: 'Data Structure', link: '/algorithm/data-structure' },
          { text: 'Common Algorithm', link: '/algorithm/common-algorithm' },
          { text: 'Interview', link: '/algorithm/interview' },
          { text: 'Used In Framework', link: '/algorithm/used-in-framework' },
        ],
      },
    ],
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
    lastUpdatedText: 'Updated Date',
  },
})
