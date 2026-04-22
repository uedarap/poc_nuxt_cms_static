<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p>Blog estático com Nuxt Content, GitHub Pages e Pages CMS.</p>
      <NuxtLink to="/blog">Ver posts</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 92px;
  color: var(--muted);
}

.site-footer p {
  margin: 0;
}

.site-footer a {
  color: var(--accent-dark);
  font-weight: 800;
}
</style>
