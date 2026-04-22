<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.app.baseURL
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const path = `/blog/${slug}`

const { data: post } = await useAsyncData(`blog-${path}`, () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .path(path)
    .first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post não encontrado' })
}

const canonicalUrl = computed(() => `${siteUrl}${baseUrl === '/' ? '' : baseUrl.slice(0, -1)}${path}`)
const ogImage = computed(() => post.value?.cover ? `${siteUrl}${baseUrl}${post.value.cover.replace(/^\//, '')}` : undefined)

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogType: 'article',
  ogImage: () => ogImage.value,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value))
}
</script>

<template>
  <article v-if="post" class="post">
    <p class="eyebrow">Post</p>
    <h1>{{ post.title }}</h1>
    <p class="post__description">{{ post.description }}</p>

    <div class="meta">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <ul v-if="post.tags?.length" class="tags" aria-label="Tags">
        <li v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </div>

    <img v-if="post.cover" class="post__cover" :src="post.cover" :alt="`Capa do post ${post.title}`">

    <ContentRenderer class="post__body" :value="post" />
  </article>
</template>
