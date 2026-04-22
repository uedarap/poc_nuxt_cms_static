<template>
  <header class="site-header">
    <NuxtLink class="site-header__brand" to="/" aria-label="Ir para a home">
      POC Blog
    </NuxtLink>

    <nav class="site-header__nav" aria-label="Navegação principal">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 72px;
  padding: 0 max(16px, calc((100vw - 1120px) / 2));
  border-bottom: 1px solid var(--border);
  background: rgba(247, 245, 239, 0.92);
  backdrop-filter: blur(14px);
}

.site-header__brand {
  font-size: 1.05rem;
  font-weight: 900;
}

.site-header__nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.site-header__nav a {
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--muted);
  font-weight: 800;
}

.site-header__nav a:hover,
.site-header__nav a.router-link-active {
  background: rgba(15, 118, 110, 0.1);
  color: var(--accent-dark);
}
</style>
