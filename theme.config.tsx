import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span><strong>Kdsign Lab:</strong> A Creative Coding Notebook</span>,
  project: {
    link: 'https://github.com/yumyo/creative-coding-notebook',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/yumyo/creative-coding-notebook',
  footer: {
    component: '',
  },
  sidebar: {
    toggleButton: true
  },
  editLink: {
    component: null
  },
  toc:{
    backToTop: true,
  }

}

export default config
