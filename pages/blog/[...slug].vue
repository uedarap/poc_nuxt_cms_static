<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.app.baseURL
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const path = `/blog/${slug}`

// Reaproveita o menu da listagem para manter a navegacao do blog consistente.
const headerMenuItems = [
  { type: 'route' as const, label: 'Home', to: '/' },
  { type: 'route' as const, label: 'Blog', to: '/blog' },
  {
    type: 'external' as const,
    label: 'Itau Cubo',
    href: 'https://cubo.network/pt/comunidade-startups/iport',
    target: '_blank',
    image: '/images/cubo.svg',
    imageAlt: 'Itau Cubo',
  },
]

// Busca o Markdown publicado pelo path calculado a partir da rota dinamica.
const { data: post } = await useAsyncData(`blog-${path}`, () => {
  return queryCollection('blog')
    .where('draft', '<>', true)
    .path(path)
    .first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post nao encontrado' })
}

// Monta URLs absolutas para canonical e preview social respeitando o baseURL do deploy.
const canonicalUrl = computed(() => `${siteUrl}${baseUrl === '/' ? '' : baseUrl.slice(0, -1)}${path}`)
const ogImage = computed(() => post.value?.cover ? `${siteUrl}${baseUrl}${post.value.cover.replace(/^\//, '')}` : undefined)
const coverImage = computed(() => post.value?.cover || '/images/bg_iport_video.png')

useSeoMeta({
  title: () => {return 'iPORT / Blog - ' + post.value?.title},
  description: () => post.value?.description,
  ogTitle: () => {return 'iPORT / Blog - ' + post.value?.title},
  ogDescription: () => post.value?.description,
  ogType: 'article',
  ogImage: () => ogImage.value,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})

// Formata a data em portugues para exibir no cabecalho do artigo.
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
  <div v-if="post" class="article-page">
    <LandingHeader :items="headerMenuItems" collapse-id="articleNavbar" />

    <main>
      <!-- Hero do artigo usa a capa do Markdown como sinal visual principal. -->
      <section class="article-hero" :style="{ backgroundImage: `url(${coverImage})` }">
        <div class="article-hero__overlay"></div>

        <div class="article-container article-hero__content">
          <NuxtLink class="back-link" to="/blog">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            Voltar para o blog
          </NuxtLink>

          <p class="article-hero__eyebrow">Artigo</p>
          <div class="title">
            <h1 style="flex: 3;">{{ post.title }}</h1>
            <p class="article-hero__description" style="flex: 1;">{{ post.description }}</p>
          </div>

          <div class="article-meta">
            <p class="article-date">
              <i class="fa fa-calendar-o" aria-hidden="true"></i>
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            </p>

            <ul v-if="post.tags?.length" class="tag-list" aria-label="Tags do artigo">
              <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Corpo do Markdown fica em uma coluna de leitura com tipografia propria. -->
      <section class="article-section">
        <div class="article-container article-shell">
          <!-- <aside class="article-aside" aria-label="Resumo do artigo">
            <p class="article-aside__label">Publicado em</p>
            <p class="article-aside__date">{{ formatDate(post.date) }}</p>

            <NuxtLink class="aside-link" to="/blog">
              Ver todos os artigos
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </NuxtLink>
          </aside> -->

          <article class="article-content">
            <img v-if="post.cover" class="article-cover" :src="post.cover" :alt="`Capa do post ${post.title}`">

            <ContentRenderer class="article-body" :value="post" />
          </article>
        </div>
      </section>
    </main>

    <ContactSection/>

    <!-- Footer institucional replica o fechamento da listagem do blog. -->
    <!-- <footer class="article-footer">
      <div class="article-container article-footer__inner">
        <img src="/images/iport_logo_mono_nobg2.png" alt="iPORT Solutions">

        <div class="article-footer__links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <a href="https://www.iportsolutions.com.br/" target="_blank" rel="noopener">Site institucional</a>
        </div>
      </div>
    </footer> -->
    
  </div>
</template>

<style lang="scss" scoped>
@use '@/style.scss' as style;

/* Pagina do artigo centraliza a mesma identidade visual usada na listagem do blog. */
.article-page {
  min-height: 100vh;
  background: style.$white;
  color: style.$dark;
}

/* Container proprio evita depender das classes globais do Bootstrap no conteudo editorial. */
.article-container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;

  .title{
    display: flex; 
    gap: 2rem;
  }
}

/* Hero usa a capa como fundo e overlay para garantir leitura do titulo. */
.article-hero {
  position: relative;
  display: flex;
  align-items: end;
  padding: 9rem 0 5rem;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}

.article-hero__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 38, 71, 0.96), rgba(10, 38, 71, 0.78) 55%, rgba(10, 38, 71, 0.36)),
    linear-gradient(0deg, rgba(0, 32, 74, 0.44), rgba(0, 32, 74, 0.44));
}

.article-hero__content {
  position: relative;
  z-index: 1;
  color: #ffffff;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 28px;
  color: rgba(255, 255, 255, 0.86);
  font-weight: 900;
  text-decoration: none;
  transition: color 0.25s ease, gap 0.25s ease;
}

.back-link:hover {
  gap: 13px;
  color: style.$yellow;
}

.article-hero__eyebrow {
  margin: 0 0 12px;
  color: style.$third2;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.article-hero h1 {
  max-width: 900px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.35rem, 5vw, 4.9rem);
  font-weight: 900;
  line-height: 1.03;
}

.article-hero__description {
  max-width: 760px;
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 1.22rem;
  line-height: 1.65;
}

/* Metadados ficam juntos para o usuario entender data e temas antes da leitura. */
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
}

.article-date {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: #ffffff;
  font-weight: 900;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.tag-list li {
  padding: 6px 11px;
  color: style.$primary;
  font-size: 0.82rem;
  font-weight: 900;
  background: style.$alt-fourth;
  border-radius: 999px;
}

/* Secao clara separa a leitura do hero escuro e acomoda a lateral de apoio. */
.article-section {
  padding: 72px 0 86px;
}

.article-shell {
  display: grid;
  // grid-template-columns: 260px minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: 44px;
}

.article-aside {
  position: sticky;
  top: 110px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid style.$line;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(10, 38, 71, 0.1);
}

.article-aside__label {
  margin: 0 0 6px;
  color: style.$secondary;
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

.article-aside__date {
  margin: 0 0 18px;
  color: style.$primary;
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 1.35;
}

.aside-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: style.$third;
  font-weight: 900;
  text-decoration: none;
  transition: color 0.25s ease, gap 0.25s ease;
}

.aside-link:hover {
  gap: 12px;
  color: style.$secondary;
}

/* Card de leitura recebe o Markdown e controla largura, espacamento e midias. */
.article-content {
  min-width: 0;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid style.$line;
  border-radius: 12px;
  box-shadow: style.$shadow;
}

.article-cover {
  display: block;
  width: 100%;
  max-height: 460px;
  object-fit: cover;
  background: style.$white;
}

.article-body {
  padding: 44px min(7vw, 74px) 58px;
}

/* Tipografia profunda estiliza os elementos gerados pelo ContentRenderer. */
.article-body :deep(*) {
  overflow-wrap: anywhere;
}

.article-body :deep(h2),
.article-body :deep(h3) {
  color: style.$primary;
  font-weight: 900;
  line-height: 1.15;
}

.article-body :deep(h2) {
  margin: 42px 0 16px;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

.article-body :deep(h3) {
  margin: 32px 0 12px;
  font-size: 1.45rem;
}

.article-body :deep(p),
.article-body :deep(li) {
  color: rgba(33, 37, 41, 0.88);
  font-size: 1.08rem;
  line-height: 1.8;
}

.article-body :deep(p) {
  margin: 0 0 22px;
}

/* Centraliza o paragrafo que o Markdown cria automaticamente ao redor de imagens. */
.article-body :deep(p:has(img)) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  display: grid;
  gap: 10px;
  margin: 0 0 24px;
  padding-left: 1.35rem;
}

.article-body :deep(a) {
  color: style.$third;
  font-weight: 900;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.article-body :deep(img) {
  display: block;
  max-height: 520px;
  margin: 34px 0;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 14px 34px rgba(10, 38, 71, 0.13);
}

.article-body :deep(blockquote) {
  margin: 34px 0;
  padding: 24px 28px;
  color: style.$primary;
  background: rgba(0, 171, 202, 0.08);
  border-left: 5px solid style.$third;
  border-radius: 8px;
}

.article-body :deep(code) {
  padding: 2px 6px;
  color: style.$primary;
  background: rgba(10, 38, 71, 0.08);
  border-radius: 5px;
}

.article-body :deep(pre) {
  overflow-x: auto;
  margin: 34px 0;
  padding: 22px;
  color: #ffffff;
  background: style.$primary;
  border-radius: 10px;
}

/* Forca a cor dos spans gerados pelo highlight dentro de blocos Markdown, mesmo com style inline. */
.article-body :deep(.language-md code span) {
  color: style.$alt-fourth;
}

.article-body :deep(pre code) {
  padding: 0;
  color: style.$white;
  background: transparent;
}

/* Footer acompanha a listagem para fechar a experiencia do blog. */
.article-footer {
  padding: 32px 0;
  background: #00204a;
}

.article-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.article-footer img {
  width: 150px;
}

.article-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.article-footer__links a {
  color: rgba(255, 255, 255, 0.76);
  font-weight: 800;
  text-decoration: none;
}

.article-footer__links a:hover {
  color: style.$third2;
}

@media (max-width: 991px) {
  .article-hero {
    min-height: 560px;
    padding-top: 142px;
  }

  .article-shell {
    grid-template-columns: 1fr;
  }

  .article-aside {
    position: static;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .article-aside__date {
    margin-bottom: 0;
  }

  .title{
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .article-hero {
    min-height: auto;
    padding: 126px 0 54px;
  }

  .article-hero__description {
    font-size: 1.04rem;
  }

  .article-section {
    padding: 38px 0 56px;
  }

  .article-body {
    padding: 28px 22px 38px;
  }

  .article-footer__inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
