<script setup lang="ts">
const config = useRuntimeConfig()
const baseUrl = config.app.baseURL
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = `${siteUrl}${baseUrl === '/' ? '' : baseUrl.slice(0, -1)}/`
// Mantem a URL de compartilhamento alinhada com a pasta publica real do asset legado.
const ogImage = `${siteUrl}${baseUrl}blog/images/blog-cover-static-site.svg`

const { data: posts } = await useAsyncData('home-posts', () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .limit(2)
    .all()
})

useSeoMeta({
  title: 'POC Blog estático com Nuxt Content',
  description: 'Base moderna para blog estático com Nuxt 4, Nuxt Content, GitHub Pages e Pages CMS.',
  ogTitle: 'POC Blog estático com Nuxt Content',
  ogDescription: 'Markdown versionado em Git, build estático e edição via Pages CMS.',
  ogType: 'website',
  ogImage,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero__inner">
        <div>
          <p class="eyebrow">Nuxt 4 + conteúdo em Git</p>
          <h1>Blog estático, editável e pronto para GitHub Pages.</h1>
          <p>
            Uma POC simples para publicar posts Markdown com SEO básico,
            geração estática e edição editorial pelo Pages CMS.
          </p>
          <div class="button-row">
            <NuxtLink class="button" to="/blog">Ler posts</NuxtLink>
            <a class="button button--ghost" href="https://pagescms.org/" target="_blank" rel="noreferrer">Pages CMS</a>
          </div>
        </div>

        <div class="hero__panel" aria-hidden="true">
          <!-- Usa o caminho publico existente para evitar falha de resolucao do Vite no build. -->
          <img src="/blog/images/blog-cover-static-site.svg" alt="">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="page-heading">
          <p class="eyebrow">Posts recentes</p>
          <h1>Conteúdo local, versionado e renderizado no build.</h1>
        </div>

        <div v-if="posts?.length" class="post-grid">
          <PostCard v-for="post in posts" :key="post.path" :post="post" />
        </div>

        <div v-else class="empty-state">
          Nenhum post publicado ainda.
        </div>
      </div>
    </section>
  </div>
</template>
