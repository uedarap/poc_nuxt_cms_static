<script setup lang="ts">
// Define o formato normalizado que a pagina usa depois de ler os Markdown pelo Nuxt Content.
type BlogPost = {
   title: string
   description: string
   date: string
   tags: string[]
   image: string
   link: string
   isFeatured: boolean
}

// Espelha os campos de frontmatter esperados nos arquivos de content/blog para manter o fluxo tipado.
type BlogContentPost = {
   path: string
   title: string
   description?: string
   date?: string
   cover?: string
   tags?: string[]
   draft?: boolean
}

const headerMenuItems = [
   //  { type: 'section' as const, label: 'Sobre', id: 'sobre', offset: 0 },
    { type: 'route' as const, label: 'Home', to: '/' },
    {
        type: 'external' as const,
        label: 'Itau Cubo',
        href: 'https://cubo.network/pt/comunidade-startups/iport',
        target: '_blank',
        image: '/images/cubo.svg',
        imageAlt: 'Itau Cubo',
    },
];

// Guarda a categoria selecionada para controlar o estado visual dos chips e filtrar a lista.
const activeCategory = ref('Todos')

// Busca os posts reais do Nuxt Content e deixa o build estatico receber os dados no SSR.
const { data: contentPosts } = await useAsyncData('blog-index-posts', () => {
   return queryCollection('blog')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all()
})

// Formata a data ISO do frontmatter para o texto curto usado nos cards do layout novo.
const formatPostDate = (value?: string) => {
   if (!value) return ''

   return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
   }).format(new Date(value))
}

// Marca como destaque qualquer Markdown cujo nome de arquivo comece com "destaque".
const isFeaturedMarkdown = (post: BlogContentPost) => {
   const filename = post.path.split('/').pop() || ''

   return filename.toLowerCase().startsWith('destaque')
}

// Converte o retorno cru do Nuxt Content no formato que o template precisa para renderizar.
const blogPosts = computed<BlogPost[]>(() => {
   return ((contentPosts.value || []) as BlogContentPost[]).map((post) => ({
      title: post.title,
      description: post.description || '',
      date: formatPostDate(post.date),
      tags: post.tags || [],
      image: post.cover || '/images/bg_iport_video.png',
      link: post.path,
      isFeatured: isFeaturedMarkdown(post)
   }))
})

// Escolhe primeiro o Markdown iniciado por "destaque"; se nao existir, usa o post mais recente.
const featuredPost = computed(() => {
   return blogPosts.value.find((post) => post.isFeatured) || blogPosts.value[0]
})

// Remove o artigo em destaque da listagem para evitar duplicidade visual abaixo do banner principal.
const listPosts = computed(() => {
   return blogPosts.value.filter((post) => post.link !== featuredPost.value?.link)
})

// Monta as categorias a partir das tags publicadas, mantendo "Todos" como opcao inicial do filtro.
const categories = computed(() => {
   const tags = new Set(listPosts.value.flatMap((post) => post.tags))

   return ['Todos', ...Array.from(tags).sort((a, b) => a.localeCompare(b))]
})

// Calcula os posts visiveis conforme o filtro selecionado pelo usuario.
const filteredPosts = computed(() => {
   if (activeCategory.value === 'Todos') return listPosts.value

   return listPosts.value.filter((post) => post.tags.includes(activeCategory.value))
})

// Atualiza a categoria ativa quando o usuario clica em um dos chips.
const selectCategory = (category: string) => {
   activeCategory.value = category
}

// Configura os metadados da pagina principal do blog com a imagem institucional padrao.
useSeoMeta({
   title: 'iPORT - Blog',
   description:
      'Conteudos sobre tecnologia, automacao portuaria, logistica e transformacao digital.',
   ogTitle: 'Blog iPORT Solutions',
   ogDescription:
      'Conteudos sobre tecnologia, automacao portuaria, logistica e transformacao digital.',
   ogType: 'website',
   ogImage: '/images/bg_iport_video.png',
   twitterCard: 'summary_large_image'
})
</script>

<template>
   <div class="blog-page">

      <LandingHeader :items="headerMenuItems" />

      <main>
         <!-- Hero editorial com imagem portuaria e overlay azul para conectar com a identidade da landing. -->
         <section class="blog-hero">
            <div class="blog-hero__overlay"></div>

            <div class="blog-hero__content">
               <p class="blog-hero__eyebrow">Blog</p>
               <h1>Porto, tecnologia e operação logistica.</h1>
               <p>
                  Insights para quem busca mais controle, rastreabilidade e eficiencia na gestao
                  de terminais portuarios.
               </p>

               <div class="blog-hero__actions">
                  <!-- <a class="button button--primary" href="#posts-section">Ver publicacoes</a> -->
                  <a class="button button--secondary" href="https://wa.me/+551333852482" target="_blank" rel="noopener">
                     Fale com a iPORT
                  </a>
               </div>
            </div>
         </section>

         <!-- Filtros de categoria convertidos do componente React para botoes Vue reativos. -->
         <!-- <section id="posts-section" class="category-section" aria-labelledby="category-title">
            <div class="blog-container">
               <h2 id="category-title" class="sr-only">Filtrar publicacoes por categoria</h2>

               <div class="category-filters">
                  <button v-for="category in categories" :key="category" type="button" class="category-chip"
                     :class="{ 'category-chip--active': activeCategory === category }"
                     @click="selectCategory(category)">
                     {{ category }}
                  </button>
               </div>
            </div>
         </section> -->

         <!-- Area principal com post em destaque e grid responsivo de publicacoes. -->
         <section class="posts-section">
            <div class="blog-container">
               <!-- Renderiza o primeiro artigo como destaque quando existir conteudo publicado. -->
               <article v-if="featuredPost" class="featured-post">
                  <NuxtLink class="featured-post__image" :to="featuredPost.link">
                     <img :src="featuredPost.image" :alt="featuredPost.title">
                     <span>Destaque</span>
                  </NuxtLink>

                  <div class="featured-post__content">
                     <p class="post-date">
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        {{ featuredPost.date }}
                     </p>

                     <ul class="tag-list" aria-label="Tags do post em destaque">
                        <li v-for="tag in featuredPost.tags" :key="tag">{{ tag }}</li>
                     </ul>

                     <h2>{{ featuredPost.title }}</h2>
                     <p>{{ featuredPost.description }}</p>

                     <NuxtLink class="read-link" :to="featuredPost.link">
                        Ler artigo completo
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                     </NuxtLink>
                  </div>
               </article>

               <div class="posts-heading">
                  <h2>Ultimas publicacoes</h2>
                  <p>{{ filteredPosts.length }} conteudos encontrados</p>
               </div>

               <div v-if="filteredPosts.length" class="post-grid">
                  <article v-for="post in filteredPosts" :key="post.link" class="blog-card">
                     <NuxtLink class="blog-card__image" :to="post.link">
                        <img :src="post.image" :alt="post.title">
                     </NuxtLink>

                     <div class="blog-card__content">
                        <p class="post-date">
                           <i class="fa fa-calendar-o" aria-hidden="true"></i>
                           {{ post.date }}
                        </p>

                        <ul class="tag-list" :aria-label="`Tags de ${post.title}`">
                           <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
                        </ul>

                        <h3>{{ post.title }}</h3>
                        <p>{{ post.description }}</p>

                        <NuxtLink class="read-link" :to="post.link">
                           Ler artigo
                           <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </NuxtLink>
                     </div>
                  </article>
               </div>

               <p v-else class="empty-state">Nenhuma publicacao encontrada para essa categoria.</p>
            </div>
         </section>

         <!-- CTA final de newsletter, sem integracao de backend por enquanto. -->
         <section class="newsletter-section">
            <div class="blog-container newsletter-section__inner">
               <div>
                  <p class="newsletter-section__eyebrow">Insights iPORT</p>
                  <h2>Receba insights sobre operacao portuaria e tecnologia</h2>
                  <p>Conteudo tecnico e estrategico para quem vive a operacao logistica.</p>
               </div>

               <form class="newsletter-form" @submit.prevent>
                  <label class="sr-only" for="newsletter-email">E-mail</label>
                  <input id="newsletter-email" type="email" placeholder="seu@email.com">
                  <button type="submit">Cadastrar</button>
               </form>
            </div>
         </section>
      </main>

      <!-- Footer institucional simples para fechar a pagina do blog sem depender de componentes globais. -->
      <footer class="blog-footer">
         <div class="blog-container blog-footer__inner">
            <img src="/images/iport_logo_mono_nobg2.png" alt="iPORT Solutions">

            <div class="blog-footer__links">
               <NuxtLink to="/">Home</NuxtLink>
               <NuxtLink to="/blog">Blog</NuxtLink>
               <a href="https://www.iportsolutions.com.br/" target="_blank" rel="noopener">Site institucional</a>
            </div>
         </div>
      </footer>
   </div>
</template>

<style lang="scss" scoped>
@use '@/style.scss' as style;
/* Centraliza a paleta da pagina para facilitar ajustes finos depois da validacao visual. */
.blog-page {
   --primary: #0a2647;
   --secondary: #164b92;
   --accent: #00abca;
   --accent-soft: #55b8d1;
   --yellow: #fecf1d;
   --text: #212529;
   --muted: rgba(33, 37, 41, 0.72);
   --surface: #ffffff;
   --surface-soft: #f5f8fa;
   --line: rgba(10, 38, 71, 0.1);
   --shadow: 0 16px 40px rgba(10, 38, 71, 0.12);
   min-height: 100vh;
   background: style.$white2;
   color: style.$dark;
}

/* Container proprio para nao depender de classes globais do Bootstrap. */
.blog-container {
   width: min(1180px, calc(100% - 32px));
   margin: 0 auto;
}

.sr-only {
   position: absolute;
   width: 1px;
   height: 1px;
   padding: 0;
   margin: -1px;
   overflow: hidden;
   clip: rect(0, 0, 0, 0);
   white-space: nowrap;
   border: 0;
}

/* Header fixo com o mesmo clima escuro/translucido usado na landing. */
.blog-header {
   position: fixed;
   inset: 0 0 auto;
   z-index: 20;
   background: rgba(0, 32, 74, 0.9);
   border-bottom: 1px solid rgba(255, 255, 255, 0.12);
   backdrop-filter: blur(14px);
}

.blog-header__inner {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 24px;
   min-height: 80px;
   padding: 0 max(16px, calc((100vw - 1180px) / 2));
}

.blog-header__brand img {
   display: block;
   width: 170px;
}

.blog-header__nav {
   display: flex;
   align-items: center;
   gap: 8px;
}

.blog-header__nav a {
   padding: 10px 12px;
   color: #ffffff;
   font-size: 0.95rem;
   font-weight: 700;
   text-decoration: none;
   border-radius: 7px;
   transition: background 0.25s ease, color 0.25s ease;
}

.blog-header__nav a:hover,
.blog-header__nav a.router-link-active {
   background: rgba(85, 184, 209, 0.18);
   color: style.$third2;
}

/* Hero usa imagem real do projeto e overlay para preservar contraste do texto. */
.blog-hero {
   position: relative;
   display: flex;
   align-items: center;
   min-height: 620px;
   padding: 200px 0 200px;
   overflow: hidden;
   background-image: url('/images/iport-view.png');
   background-position: center 75%;
   background-size: cover;
}

.blog-hero__overlay {
   position: absolute;
   inset: 0;
   background:
      linear-gradient(90deg, rgba(10, 38, 71, 0.94), rgba(10, 38, 71, 0.72) 52%, rgba(10, 38, 71, 0.34)),
      linear-gradient(0deg, rgba(0, 32, 74, 0.34), rgba(0, 32, 74, 0.34));
}

.blog-hero__content {
   position: relative;
   z-index: 1;
   width: min(1180px, calc(100% - 32px));
   margin: 0 auto;
   color: #ffffff;
}

.blog-hero__eyebrow,
.newsletter-section__eyebrow {
   margin: 0 0 .5rem;
   color: style.$third2;
   font-weight: 900;
   letter-spacing: 0;
   text-transform: uppercase;
   font-size: 2.5rem;
}

.blog-hero h1 {
   max-width: 800px;
   margin: 0;
   color: #ffffff;
   font-size: clamp(2.4rem, 5vw, 4.8rem);
   line-height: 1.02;
   font-weight: 900;
}

.blog-hero__content>p:not(.blog-hero__eyebrow) {
   max-width: 680px;
   margin: 24px 0 0;
   color: rgba(255, 255, 255, 0.86);
   font-size: 1.25rem;
   line-height: 1.6;
}

.blog-hero__actions {
   display: flex;
   flex-wrap: wrap;
   gap: 14px;
   margin-top: 32px;
}

.button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   min-height: 48px;
   padding: 12px 18px;
   color: #ffffff;
   font-weight: 900;
   text-decoration: none;
   border-radius: 7px;
   transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
}

.button:hover {
   transform: translateY(-2px);
}

.button--primary {
   background: style.$third2;
}

.button--secondary {
   color: style.$primary;
   background: style.$yellow;
}

/* Secao de filtros separada para manter respiro entre o hero e a listagem. */
.category-section {
   padding: 42px 0 28px;
   background: style.$white2;
}

.category-filters {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   gap: 12px;
}

.category-chip {
   min-height: 44px;
   padding: 10px 18px;
   color: style.$primary;
   font-weight: 800;
   background: #eaeaea;
   border: 0;
   border-radius: 999px;
   cursor: pointer;
   transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.category-chip:hover,
.category-chip--active {
   color: #ffffff;
   background: style.$third2;
   box-shadow: 0 10px 24px rgba(85, 184, 209, 0.28);
   transform: translateY(-1px);
}

/* Posts section organiza o destaque e a grade em uma area clara, sem depender de Tailwind. */
.posts-section {
   padding: 3rem 0 4rem;
   background: style.$white2;
}

.featured-post {
   display: grid;
   grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
   overflow: hidden;
   margin-bottom: 64px;
   background: #ffffff;
   border: 1px solid style.$line;
   border-radius: 12px;
   box-shadow: style.$shadow;
}

.featured-post__image {
   position: relative;
   display: block;
   min-height: 390px;
   overflow: hidden;
   background: style.$white;
}

.featured-post__image img,
.blog-card__image img {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.featured-post__image span {
   position: absolute;
   top: 18px;
   left: 18px;
   padding: 7px 15px;
   color: style.$primary;
   font-weight: 900;
   background: style.$yellow;
   border-radius: 999px;
}

.featured-post__content {
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 42px;
}

.post-date {
   display: flex;
   align-items: center;
   gap: 8px;
   margin: 0 0 16px;
   color: style.$secondary;
   font-size: 0.95rem;
   font-weight: 800;
}

.tag-list {
   display: flex;
   flex-wrap: wrap;
   gap: 8px;
   padding: 0;
   margin: 0 0 16px;
   list-style: none;
}

.tag-list li {
   padding: 5px 10px;
   color: style.$third;
   font-size: 0.82rem;
   font-weight: 900;
   background: rgba(0, 171, 202, 0.1);
   border-radius: 999px;
}

.featured-post h2,
.posts-heading h2,
.newsletter-section h2 {
   color: style.$primary;
   font-weight: 900;
}

.featured-post h2 {
   margin: 0 0 16px;
   font-size: clamp(2rem, 3vw, 3rem);
   line-height: 1.08;
}

.featured-post__content>p:not(.post-date) {
   margin: 0 0 24px;
   color: style.$dark;
   font-size: 1.05rem;
   line-height: 1.7;
}

.read-link {
   display: inline-flex;
   align-items: center;
   gap: 9px;
   width: fit-content;
   color: style.$third;
   font-weight: 900;
   text-decoration: none;
   transition: color 0.25s ease, gap 0.25s ease;
}

.read-link:hover {
   gap: 13px;
   color: style.$secondary;
}

.posts-heading {
   display: flex;
   align-items: end;
   justify-content: space-between;
   gap: 16px;
   margin-bottom: 26px;
}

.posts-heading h2 {
   margin: 0;
   font-size: 2.1rem;
}

.posts-heading p {
   margin: 0;
   color: style.$dark;
   font-weight: 800;
}

.post-grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: 28px;
}

.blog-card {
   display: flex;
   flex-direction: column;
   overflow: hidden;
   min-height: 100%;
   background: #ffffff;
   border: 1px solid style.$line;
   border-radius: 12px;
   box-shadow: 0 10px 28px rgba(10, 38, 71, 0.1);
   transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.blog-card:hover {
   transform: translateY(-5px);
   box-shadow: 0 18px 42px rgba(10, 38, 71, 0.16);
}

.blog-card__image {
   display: block;
   height: 205px;
   overflow: hidden;
   background: style.$white;
}

.blog-card__image img {
   transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__image img {
   transform: scale(1.05);
}

.blog-card__content {
   display: flex;
   flex: 1;
   flex-direction: column;
   padding: 24px;
}

.blog-card h3 {
   display: -webkit-box;
   min-height: 58px;
   margin: 0 0 12px;
   overflow: hidden;
   color: style.$primary;
   font-size: 1.35rem;
   line-height: 1.22;
   font-weight: 900;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
}

.blog-card__content>p:not(.post-date) {
   display: -webkit-box;
   flex: 1;
   margin: 0 0 22px;
   overflow: hidden;
   color: style.$dark;
   line-height: 1.62;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
}

.empty-state {
   padding: 32px;
   color: style.$dark;
   text-align: center;
   background: style.$white;
   border-radius: 12px;
}

/* Newsletter fecha a pagina com CTA escuro e botao amarelo, como recomendado no layout do Figma. */
.newsletter-section {
   padding: 70px 0;
   background: style.$primary;
}

.newsletter-section__inner {
   display: grid;
   grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
   align-items: center;
   gap: 42px;
}

.newsletter-section h2 {
   max-width: 700px;
   margin: 0 0 14px;
   color: #ffffff;
   font-size: clamp(2rem, 3vw, 3rem);
}

.newsletter-section p:not(.newsletter-section__eyebrow) {
   margin: 0;
   color: rgba(255, 255, 255, 0.76);
   font-size: 1.08rem;
}

.newsletter-form {
   display: flex;
   gap: 10px;
   padding: 8px;
   background: rgba(255, 255, 255, 0.12);
   border: 1px solid rgba(255, 255, 255, 0.16);
   border-radius: 10px;
}

.newsletter-form input {
   min-width: 0;
   flex: 1;
   min-height: 50px;
   padding: 0 15px;
   color: #ffffff;
   background: rgba(255, 255, 255, 0.1);
   border: 0;
   border-radius: 7px;
   outline: none;
}

.newsletter-form input::placeholder {
   color: rgba(255, 255, 255, 0.62);
}

.newsletter-form button {
   min-height: 50px;
   padding: 0 18px;
   color: style.$primary;
   font-weight: 900;
   background: style.$yellow;
   border: 0;
   border-radius: 7px;
   cursor: pointer;
}

/* Footer separado para esta pagina do blog. */
.blog-footer {
   padding: 32px 0;
   background: #00204a;
}

.blog-footer__inner {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 24px;
}

.blog-footer img {
   width: 150px;
}

.blog-footer__links {
   display: flex;
   flex-wrap: wrap;
   gap: 14px;
}

.blog-footer__links a {
   color: rgba(255, 255, 255, 0.76);
   font-weight: 800;
   text-decoration: none;
}

.blog-footer__links a:hover {
   color: style.$third2;
}

@media (max-width: 991px) {
   .blog-header__inner {
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      min-height: 118px;
      padding-block: 14px;
   }

   .blog-header__nav {
      width: 100%;
      overflow-x: auto;
      padding-bottom: 4px;
   }

   .blog-hero {
      min-height: 620px;
      padding-top: 170px;
   }

   .featured-post,
   .newsletter-section__inner {
      grid-template-columns: 1fr;
   }

   .post-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }
}

@media (max-width: 767px) {
   .blog-header__brand img {
      width: 145px;
   }

   .blog-header__nav a {
      white-space: nowrap;
   }

   .blog-hero {
      min-height: auto;
      padding-bottom: 58px;
   }

   .blog-hero__content>p:not(.blog-hero__eyebrow) {
      font-size: 1.06rem;
   }

   .blog-hero__actions,
   .newsletter-form,
   .posts-heading,
   .blog-footer__inner {
      align-items: stretch;
      flex-direction: column;
   }

   .button,
   .newsletter-form button {
      width: 100%;
   }

   .featured-post__image {
      min-height: 240px;
   }

   .featured-post__content,
   .blog-card__content {
      padding: 22px;
   }

   .post-grid {
      grid-template-columns: 1fr;
   }
}
</style>
