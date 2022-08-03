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
      { text: 'Typescript', link: '/typescript/index' },
      { text: 'HTTP', link: '/http/index' },
      { text: 'ToolKit', link: '/tool/index' },
    ],
    sidebar: [
      // {
      //   text: 'Source Code',
      //   items: [
      //     { text: 'Core Engine', link: '/introduction' },
      //     { text: 'Getting Started', link: '/getting-started' },
      //   ],
      // },
      {
        text: 'Algorithm',
        items: [
          { text: 'Overview', link: '/algorithm/index' },
          { text: 'Data Structure', link: '/algorithm/data-structure' },
          { text: 'Common Algorithm', link: '/algorithm/common-algorithm' },
          { text: 'Used In Framework', link: '/algorithm/used-in-framework' },
          { text: 'FAQ', link: '/algorithm/interview' },
        ],
      },
      {
        text: 'Typescript',
        items: [
          { text: 'Overview', link: '/typescript/index' },
          { text: 'Challenges', link: '/typescript/challenges' },
        ],
      },
      {
        text: 'HTTP',
        items: [
          { text: 'Overview', link: '/http/index' },
          { text: 'FAQ', link: '/http/FAQ' },
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
