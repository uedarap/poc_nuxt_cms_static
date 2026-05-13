<script setup lang="ts">
const config = useRuntimeConfig()
const baseUrl = config.app.baseURL
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = `${siteUrl}${baseUrl === '/' ? '' : baseUrl.slice(0, -1)}/blog`

const { data: posts } = await useAsyncData('blog-posts', () => {
   return queryCollection('blog')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all()
})

useSeoMeta({
   title: 'Blog',
   description: 'Posts publicados a partir de arquivos Markdown locais com Nuxt Content.',
   ogTitle: 'Blog',
   ogDescription: 'Conteúdo versionado em Git e publicado como site estático.',
   ogType: 'website',
   ogImage: `${siteUrl}${baseUrl}images/blog-cover-static-site.svg`,
   twitterCard: 'summary_large_image'
})

useHead({
   link: [{ rel: 'canonical', href: canonicalUrl }]
})
</script>

<template>
   <section class="section">
      <div class="container">
         <div class="page-heading">
            <p class="eyebrow">Blog</p>
            <h1>Posts publicados</h1>
            <p>Arquivos Markdown em <code>content/blog</code>, sem backend em produção.</p>
         </div>

         <div v-if="posts?.length" class="post-grid">
            <PostCard v-for="post in posts" :key="post.path" :post="post" />
         </div>

         <div v-else class="empty-state">
            Nenhum post publicado ainda.
         </div>
      </div>
   </section>
</template>
