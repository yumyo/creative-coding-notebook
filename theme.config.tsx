import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  primaryHue: 200,
  logo: <span><strong>KDSIGN Lab:</strong> A Creative Coding Notebook</span>,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Kdsign Lab: A Creative Coding Notebook" />
      <meta property="og:description" content="A creative coding notebook and developer (b)log" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s - KDSIGN Lab',
      description: "A creative coding notebook and developer (b)log"
    }
  },
  project: {
    link: 'https://github.com/yumyo/',
  },
  chat: {
    link: 'https://kdsign.com/contact',
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
