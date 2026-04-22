<script setup lang="ts">
type PostCardPost = {
  path: string
  title: string
  description?: string
  date: string
  cover?: string
  tags?: string[]
}

defineProps<{
  post: PostCardPost
}>()

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value))
}
</script>

<template>
  <article class="post-card">
    <NuxtLink class="post-card__cover-link" :to="post.path" :aria-label="`Ler ${post.title}`">
      <img v-if="post.cover" class="post-card__cover" :src="post.cover" :alt="`Capa do post ${post.title}`">
    </NuxtLink>

    <div class="post-card__content">
      <div class="meta">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>

      <h2>
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </h2>

      <p>{{ post.description }}</p>

      <ul v-if="post.tags?.length" class="tags" aria-label="Tags">
        <li v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.post-card {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-strong);
  box-shadow: var(--shadow);
}

.post-card__cover-link {
  display: block;
  aspect-ratio: 16 / 9;
  background: var(--surface);
}

.post-card__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card__content {
  display: grid;
  gap: 12px;
  padding: 22px;
}

.post-card h2,
.post-card p {
  margin: 0;
}

.post-card h2 {
  font-size: 1.45rem;
  line-height: 1.15;
}

.post-card h2 a:hover {
  color: var(--accent-dark);
}

.post-card p {
  color: var(--muted);
}
</style>
