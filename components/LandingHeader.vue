<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Tipos aceitos pelo menu: item de scroll, rota interna do Nuxt ou link externo.
type HeaderMenuItem =
    | {
        type: 'section'
        label: string
        id: string
        offset?: number
    }
    | {
        type: 'route'
        label: string
        to: string
    }
    | {
        type: 'external'
        label: string
        href: string
        target?: string
        image?: string
        imageAlt?: string
    }

const props = withDefaults(
    defineProps<{
        items: HeaderMenuItem[]
        logoSrc?: string
        logoAlt?: string
        collapseId?: string
    }>(),
    {
        logoSrc: '/images/iport_logo_mono_nobg2.png',
        logoAlt: 'iPORT Solutions',
        collapseId: 'navbarSupportedContent',
    }
)

const route = useRoute()
const isScrolled = ref(false)
const activeSection = ref('')

// Calcula internamente se o header esta compacto e qual item de secao deve ficar ativo.
const handleScrollState = () => {
    let currentSection = ''
    isScrolled.value = window.scrollY > 50

    props.items.forEach((item) => {
        if (item.type !== 'section') return

        const section = document.getElementById(item.id)
        if (!section) return

        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = item.id
        }
    })

    activeSection.value = currentSection
}

// Marca como ativo tanto o item de secao atual quanto a rota interna em navegacao.
const isItemActive = (item: HeaderMenuItem) => {
    if (item.type === 'section') return activeSection.value === item.id
    if (item.type === 'route') return route.path === item.to

    return false
}

// Faz o scroll suave ate a secao configurada no item do menu.
const scrollToSection = (id: string, offset = 50) => {
    const section = document.getElementById(id)
    if (!section) return

    const y = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
}

// Encaminha o clique de secao para o scroll interno do proprio header.
const handleSectionClick = (item: Extract<HeaderMenuItem, { type: 'section' }>) => {
    scrollToSection(item.id, item.offset)
}

onMounted(() => {
    handleScrollState()
    window.addEventListener('scroll', handleScrollState)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollState)
})
</script>

<template>
    <header class="header_section" :class="[{ top: activeSection === '' }, { scrolled: isScrolled }]">
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container">
                <NuxtLink class="navbar-brand" to="/" aria-label="Ir para a pagina inicial">
                    <img :src="logoSrc" :alt="logoAlt" />
                </NuxtLink>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    :data-target="`#${collapseId}`"
                    :aria-controls="collapseId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                </button>

                <div class="collapse navbar-collapse" :id="collapseId">
                    <ul class="navbar-nav">
                        <li
                            v-for="item in items"
                            :key="item.type === 'section' ? item.id : item.label"
                            class="nav-item"
                            :class="{ active: isItemActive(item) }"
                        >
                            <a
                                v-if="item.type === 'section'"
                                class="nav-link"
                                href="javascript:void(0)"
                                @click="handleSectionClick(item)"
                            >
                                {{ item.label }}
                            </a>

                            <NuxtLink v-else-if="item.type === 'route'" class="nav-link" :to="item.to">
                                {{ item.label }}
                            </NuxtLink>

                            <a
                                v-else
                                class="nav-link"
                                :href="item.href"
                                :target="item.target || '_self'"
                                :rel="item.target === '_blank' ? 'noopener' : undefined"
                            >
                                <img
                                    v-if="item.image"
                                    class="cubo"
                                    :class="{ scrolled: isScrolled }"
                                    :src="item.image"
                                    :alt="item.imageAlt || item.label"
                                />
                                <span v-else>{{ item.label }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '@/style.scss' as style;

// Alinha verticalmente os itens do menu, inclusive quando o item e uma imagem.
.nav-item {
    align-content: center;
}

// Mantem o tamanho da logo igual ao header original da landing.
.navbar-brand img {
    width: 200px;
    transition: width 0.3s ease;
}

// Aplica o estado compacto quando a pagina rola, preservando o comportamento antigo.
.header_section.scrolled {
    padding: 8px 0;
    background: rgba(#00204A, 0.9);

    .navbar-brand img {
        width: 150px;
        transition: width 0.3s ease;
    }

    .nav-link {
        padding: 3px 15px;
    }

    .cubo {
        width: 60px;
    }
}

// Controla a marca do Cubo no menu como um item especial de imagem.
.cubo {
    width: 100px;
    opacity: 0.7;
    transition: width 0.3s ease, opacity 0.3s ease;
}
</style>
