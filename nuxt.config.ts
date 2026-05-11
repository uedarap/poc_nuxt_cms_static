import { defineNuxtConfig } from "nuxt/config"

const repositoryName = 'poc_nuxt_cms_static'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || `https://example.github.io/${repositoryName}`

export default defineNuxtConfig({
  srcDir: '.',
  modules: ['@nuxt/content'],
  compatibilityDate: '2026-04-22',
  app: {
    baseURL,
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      link: [
        { rel: 'icon', href: `${baseURL}favicon.svg` }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl,
      repositoryName
    }
  },
  css: ['~/assets/css/main.css'],
  // nitro: {
  //   preset: 'github_pages',
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/', '/blog']
  //   }
  // },
  // routeRules: {
  //   '/': { prerender: true },
  //   '/blog': { prerender: true },
  //   '/blog/**': { prerender: true }
  // },
  typescript: {
    strict: true
  }
})
