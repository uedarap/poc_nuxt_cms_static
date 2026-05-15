<template>
    <LGPD></LGPD>
    <div class="hero_area">

        <div class="hero_bg_box">
            <div class="bg_img_box" style="position: relative; overflow: hidden; width: 100%; height: 100%;">
                <!-- Placeholder para a imagem -->
                <img :src="publicAsset('/images/bg_iport_video.png')" alt="background" class="placeholder-image"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;">

                <!-- Vídeo do Vimeo -->
                <iframe
                    src="https://player.vimeo.com/video/1115938343?&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;background=1&amp;app_id=58479"
                    frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
                    style="position: absolute; top: 50%; left: 50%; aspect-ratio: 2/1; height: 120%; transform: translate(-50%, -50%); z-index: 2; pointer-events: none;"
                    title="iPort Landing" onload="hidePlaceholder()">
                </iframe>
            </div>
            <!-- <img src="../images/hero-bg-e.png" alt=""> -->
        </div>

        <!-- Header componentizado para reaproveitar menus com scroll, rotas Nuxt e links externos. -->
        <LandingHeader :items="headerMenuItems" />

        <!-- end header section -->

        <!-- slider section -->
        <section class="slider_section">
            <div id="customCarousel1" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="container ">
                            <div class="row">
                                <div class="col-lg-6 ">
                                    <div class="detail-box">
                                        <h1>
                                            Tecnologia que conecta e transforma portos.
                                        </h1>
                                        <h4>
                                            A iPORT Solutions é líder em automação portuária no Brasil, com soluções
                                            digitais que integram, controlam e otimizam a operação de terminais
                                            logísticos.
                                        </h4>
                                        <div class="btn-box">
                                            <a href="https://wa.me/+551333852482" class="btn1" target="_blank">
                                                Solicite uma demonstração
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="img-box">
                                        <!-- <img src="./images/navio.png" alt=""> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item ">
                        <div class="container ">
                            <div class="row">
                                <div class="col-lg-6 ">
                                    <div class="detail-box">
                                        <h1>
                                            TOS iPORT: o cérebro por trás da sua operação portuária.
                                        </h1>
                                        <h4>
                                            Gestão em tempo real do pátio, gate, agendamentos e fluxo operacional com
                                            integração total aos demais sistemas logísticos.
                                        </h4>
                                        <div class="btn-box">
                                            <a href="https://wa.me/+551333852482" class="btn1">
                                                Conhecer agora
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="img-box">
                                        <!-- <img src="./images/ship.png" alt=""> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="container ">
                            <div class="row">
                                <div class="col-lg-6 ">
                                    <div class="detail-box">
                                        <h1>
                                            Mais controle, menos falhas: integração total ao seu fluxo logístico.
                                        </h1>
                                        <h4>
                                            Automatize a armazenagem, a conferência de cargas e os checklists
                                            operacionais com rastreabilidade fiscal de ponta a ponta.
                                        </h4>
                                        <div class="btn-box">
                                            <a href="https://wa.me/+551333852482" class="btn1">
                                                Conhecer todos os módulos
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="img-box">
                                        <!-- <img src="./images/earth.png" alt=""> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <ol class="carousel-indicators" style="max-width: 1170px; justify-content: flex-start; margin: 50px auto;">
                    <li data-target="#customCarousel1" data-slide-to="0" class="active"></li>
                    <li data-target="#customCarousel1" data-slide-to="1"></li>
                    <li data-target="#customCarousel1" data-slide-to="2"></li>
                </ol> -->
                <div>
                    <a class="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Anterior</span>
                    </a>
                    <a class="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Próximo</span>
                    </a>
                </div>
            </div>

        </section>
        <!-- end slider section -->
    </div>

    <!-- #region service section -->
    <section class="service_section layout_padding mt-5" id="service_section">
        <div class="service_container">
            <div class="container" style="max-width: 1370px;">
                <div class="heading_container heading_center">
                    <h2>
                        Isso é <span>iPORT Solutions</span>.
                    </h2>
                    <p style="text-align: justify; color: #0A2647; opacity: .7;">
                        Uma plataforma completa para gestão portuária e aduaneira, baseado em <b>módulos
                            independentes</b> que se adaptam ao
                        seu negócio.
                    </p>
                </div>

                <div class="row tos">

                    <div id="categories">
                            <div
                                class="category-button"
                                :class="{ active: selectedCategory === null }"
                                @click="selectedCategory = null"
                            >
                                <span>Todas</span>
                            </div>

                            <div
                                v-for="category in categories"
                                :key="category"
                                class="category-button"
                                :class="{ active: selectedCategory === category }"
                                @click="toggleCategory(category)"
                            >
                                <span>{{ category }}</span>
                            </div>
                        </div>

                    <div class="col-xl-7" style="padding: 0; display: flex; justify-content: space-between; flex-direction: column;">
                        <div class="grid-tos">
                            <div v-for="module in filteredModules" :key="module.id" :class="['module', { selected: selectedTOS === module.name }]" @click="selectedTOS = module.name">
                                <h3 v-html="module.title"></h3>
                                <img :src="publicAsset(`/images/icons_tos/${module.name.toLowerCase()}.svg`)" :alt="module.name"
                                    :style="
                                        (module.name.toLowerCase() === 'ipuc') ||
                                        (module.name.toLowerCase() === 'icarga') ||
                                        (module.name.toLowerCase() === 'icompliance')
                                        ? 'width: 50%; height: auto' : ''" />
                            </div>
                        </div>

                        <div id="isos">
                            <div class="iso col-6" style="display: flex;">
                                <img :src="publicAsset('/images/iso27001.png')" alt="ISO27001" style="width: 100%;"
                                    class="col-4 col-lg-4">
                                <img :src="publicAsset('/images/iso28000.png')" alt="ISO28000" style="width: 100%;"
                                    class="col-4 col-lg-4">
                                <img :src="publicAsset('/images/iso31000.png')" alt="ISO31000" style="width: 100%;"
                                    class="col-4 col-lg-4">
                            </div>
                            <div class="iso col-6" style="display: flex; align-items: center;">
                                <img :src="publicAsset('/images/aeo.png')" alt="AEO" class="col-6 col-lg-6"
                                    style="height: 60%;">
                                <img :src="publicAsset('/images/microsoft_hub_nobg.png')" alt="" class="col-6 col-lg-6"
                                    style="width: 100%;">
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-5 title">
                        <div class="box" style="margin-top: 0;">
                            <div class="detail-box">
                                <h5>
                                    {{modulesJson.find(m => m.name === selectedTOS)?.name || 'Suíte SaaS Modular iPORT Solutions'}}
                                </h5>
                                <p>
                                    <b>{{modulesJson.find(m => m.name === selectedTOS)?.sub}}</b>
                                </p>
                                <div class="row text-box">
                                    <!-- <i class="fa fa-arrows-alt" aria-hidden="true"></i> -->
                                    <span style="text-align: justify;" v-html="
                                        modulesJson.find(m => m.name === selectedTOS)?.description ||
                                        'Selecione um módulo para ver a descrição detalhada.'">
                                    </span>
                                </div>
                                <div class="row" style="margin-top: 20px;">
                                    <a href="https://wa.me/+551333852482" target="_blank"
                                        style="color: #696969; font-size: 1.2rem; font-weight: bolder; text-align: center;">
                                        Solicitar uma demonstração
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- #endregion service section -->

    <!-- about section -->
    <section id="about_section" class="about_section layout_padding">
        <div class="container">
            <div class="heading_container heading_center">
                <h2>
                    Cases de <span>Sucesso</span>
                </h2>
                <p>Portos | Agronegócio | Operador Logístico | Químico | Siderurgica | Distribuição | Mineração</p>
            </div>
            <div class="row infos">
                <Carousel :slides="slides"></Carousel>
            </div>
        </div>

        <AutoCarousel></AutoCarousel>

        <div class="container" id="advantages">
            <div class="heading_container heading_center">
                <h2>
                    <span>Vantagens</span> do Software <span>iPORT</span>
                </h2>
                <!-- <p style="text-align: start;">
                    <b>Nossos diferenciais</b> estão na integração total com a RFB, ANTAQ e Portos Públicos e Privados,
                    em uma arquitetura modular e escalável que atende a todos os tipos de terminais. Oferecendo
                    monitoramento em tempo real com dashboards operacionais e contando com uma equipe técnica
                    experiente, dedicada a implantações completas de TOS no Brasil.<br />
                    Podendo ser implantada <b>On Premises</b> ou na <b>Cloud</b> do cliente, garantindo flexibilidade e
                    aderência às necessidades de cada operação.
                </p> -->
            </div>
            <div class="row infos" style="margin-bottom: 30px;">
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-link"></i>
                            <h3>Integração completa</h3>
                        </div>
                        <span>
                            API’s abertas, integráveis com órgãos reguladores e sistemas corporativos. Conexão com
                            equipamentos como controladores de acesso, balanças e OCR.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-line-chart"></i>
                            <h3>Arquitetura escalável</h3>
                        </div>
                        <span>
                            Sistema modular que atende de pequenas a grandes operações, crescendo com o seu negócio.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-dollar"></i>
                            <h3>Custos reduzidos</h3>
                        </div>
                        <span>
                            Sem necessidade de instalações complexas. Reduza gastos e simplifique a operação.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-laptop"></i>
                            <h3>Acesso remoto e seguro</h3>
                        </div>
                        <span>
                            100% web, acesso imediato e seguro a partir de qualquer navegador.
                        </span>
                    </div>
                </div>
            </div>
            <div class="row infos">
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-cubes"></i>
                            <h3>Implantação flexível</h3>
                        </div>
                        <span>
                            Escolha Cloud ou On Premises, de acordo com as necessidades da sua operação.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-user"></i>
                            <h3>Suporte especializado</h3>
                        </div>
                        <span>
                            Equipe técnica dedicada a manter estabilidade, disponibilidade e evolução contínua do
                            sistema.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-shield"></i>
                            <h3>Segurança e backup</h3>
                        </div>
                        <span>
                            Proteção em nuvem com backups frequentes e alta confiabilidade dos dados.
                        </span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="box">
                        <div>
                            <i class="fa fa-refresh"></i>
                            <h3>Atualizações contínuas</h3>
                        </div>
                        <span>
                            Sistema sempre atualizado, sem custos extras ou interrupções.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- #endregion about section -->

    <!-- why section -->
    <section
        class="why-section layout_padding partner-section"
        :style="{ backgroundImage: `url(${publicAsset('/images/minimalist_boat_2.png')})`, paddingTop: '7rem' }"
    >
        <div class="container" style="margin-bottom: 40px;">
            <div class="heading_container heading_center">
                <h2>
                    <span>Presença</span> nacional, <span>Escala</span> operacional <span>e Confiança</span> do mercado.
                </h2>
            </div>
        </div>

        <div class="container mt-5">
            <div ref="sectionRef" class="row sectionRef" style="align-items: center;">
                <div class="col-md-7 numbers-text">
                    <p>A iPORT apoia operações portuárias e logísticas em todo o Brasil, com soluções utilizadas por grandes empresas e resultados comprovados em movimentação, controle de acesso e agendamento.</p>
                    <!-- <img src="./images/braza.png" alt="iPort no brasil"> -->
                </div>

                <div class="col-md-5 numbers">
                    <div v-for="(item, i) in counters" :key="i">
                        <div class="number">
                            <h3>{{(item.prefix ?? "") + displayValues[i] }}</h3>
                            <p v-if="item.suffix">{{ item.suffix }}</p>
                        </div>
                        <div class="text">
                            <p v-html="item.label"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end why section -->

    <!-- team section -->
    <section id="time" class="team_section layout_padding">
        <div class="container-fluid">
            <div class="heading_container heading_center container">
                <h2 class="">
                    Nossa <span> Diretoria</span> & Conselho <span>Administrativo</span>
                </h2>
            </div>

            <div class="team_container">
                <div class="row" style="justify-content: center;">
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="box ">
                            <div class="img-box">
                                <img :src="publicAsset('/images/jose.jpg')" class="img1" alt="">
                            </div>
                            <div class="detail-box">
                                <h5>
                                    José Luis Mesquita
                                </h5>
                                <p>
                                    Founder & CEO
                                </p>
                            </div>
                            <div class="social_box">
                                <!-- <a href="#">
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </a> -->
                                <a href="https://www.linkedin.com/in/joseluismesquita/" target="_blank">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                                <!-- <a href="#">
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                </a> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="box ">
                            <div class="img-box">
                                <img :src="publicAsset('/images/alex.jpg')" class="img1" alt="">
                            </div>
                            <div class="detail-box">
                                <h5>
                                    Alexsandro S. Lima
                                </h5>
                                <p>
                                    Founder & CIO
                                </p>
                            </div>
                            <div class="social_box">
                                <a href="https://www.linkedin.com/in/alexsandro-lima-642b4a35/" target="_blank">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="box ">
                            <div class="img-box">
                                <img :src="publicAsset('/images/lucia.jpg')" class="img1" alt="">
                            </div>
                            <div class="detail-box">
                                <h5>
                                    Lucia Mesquita Roma
                                </h5>
                                <p>
                                    Founder & CFO
                                </p>
                            </div>
                            <div class="social_box">
                                <a href="https://www.linkedin.com/in/lucia-ratto-de-mesquita-roma-5b952846/"
                                    target="_blank">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="box ">
                            <div class="img-box">
                                <img :src="publicAsset('/images/vander.jpg')" class="img1" alt="">
                            </div>
                            <div class="detail-box">
                                <h5>
                                    Vander S. Abreu
                                </h5>
                                <p>
                                    Founder & CCO / COO
                                </p>
                            </div>
                            <div class="social_box">
                                <a href="https://www.linkedin.com/in/vandersabreu/" target="_blank">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-6">
                        <div class="box ">
                            <div class="img-box">
                                <img :src="publicAsset('/images/russo.jpg')" class="img1" alt="">
                            </div>
                            <div class="detail-box">
                                <h5>
                                    Antonio Russo
                                </h5>
                                <p>
                                    Founder & Board Member
                                </p>
                            </div>
                            <div class="social_box">
                                <a href="https://www.linkedin.com/in/antonio-russo-7480543a/" target="_blank">
                                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end team section -->

    <!-- Social section -->
    <section v-if="posts.length" class="client_section layout_padding post_section">
        <div class="container">
            <div class="heading_container heading_center psudo_white_primary mb_45">
                <h2>
                    Fique por <span>Dentro</span>
                </h2>
            </div>
            <div class="carousel-wrap">
                <div class="owl-carousel client_owl-carousel">
                    <div v-for="post in posts" :key="post.id" class="item">
                        <div class="box">
                            <div class="img-box">
                                <a :href=post.permalink target="_blank">
                                    <img :src=post.media_url alt="" class="box-img">
                                </a>
                            </div>
                            <div class="detail-box">
                                <div class="client_id">
                                    <div class="client_info">
                                        <a href="https://www.linkedin.com/company/iportsolutions/" target="_blank">
                                            <h6>
                                                @iportsolutions
                                            </h6>
                                        </a>
                                        <p>
                                            {{ post.timestamp }}
                                        </p>
                                    </div>
                                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                                </div>
                                <p class="caption"> {{ post.caption }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end client section -->

    <!-- info section -->
    <ContactSection/>
    <!-- end info section -->

</template>


<script setup lang="ts">
import AutoCarousel from '@/components/AutoCarousel.vue';
import LGPD from '@/components/LGPD.vue';
import Carousel from '@/components/Carousel.vue';
import LandingHeader from '@/components/LandingHeader.vue';
import linkedinPosts from "@/assets/linkedin_posts.json";
import modulesJson from "@/assets/modules.json";
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { usePublicAsset } from '~/composables/usePublicAsset';

const config = useRuntimeConfig()
const baseUrl = config.app.baseURL
const siteUrl = config.public.siteUrl.replace(/\/$/, '')
const canonicalUrl = `${siteUrl}${baseUrl === '/' ? '' : baseUrl.slice(0, -1)}/`
const ogImage = `${siteUrl}${baseUrl}images/blog-cover-static-site.svg`
const publicAsset = usePublicAsset()

useSeoMeta({
  title: 'iPORT Solutions',
  description: 'Solução completa para gestão portuaria.',
  ogTitle: 'iPORT Solutions',
  ogDescription: 'Solução completa para gestão portuaria.',
  ogType: 'website',
  ogImage,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})

const posts = ref(<any>[]);

const selectedTOS = ref('');
const selectedCategory = ref<string | null>(null);

const sections = [
    { id: 'service_section', name: 'Soluções' },
    { id: 'advantages', name: 'Vantagens', offset: 100 },
    { id: 'time', name: 'Nosso time', offset: 1 },
    { id: 'contact', name: 'Contato' },
];

// Configura os itens do header componentizado, misturando scroll interno, rota Nuxt e link externo.
const headerMenuItems = [
    ...sections.map((section) => ({
        type: 'section' as const,
        label: section.name,
        id: section.id,
        offset: section.offset,
    })),
    { type: 'route' as const, label: 'Blog', to: '/blog' },
    {
        type: 'external' as const,
        label: 'Itau Cubo',
        href: 'https://cubo.network/pt/comunidade-startups/iport',
        target: '_blank',
        image: publicAsset('/images/cubo.svg'),
        imageAlt: 'Itau Cubo',
    },
];

const sectionRef = ref(null);
const displayValues = ref([0, 0, 0]); // valores que serão mostrados

const counters = [
    { value: 16, suffix: "Estados", label: "Tecnologia presente em mais da metade do <b>Brasil</b>" },
    { prefix: "+", value: 100, suffix: "Milhões", label: "Graneis <b>sólidos</b> movimentados" },
    { prefix: "+", value: 30, suffix: "Milhões m³", label: "Graneis <b>liquidos</b> movimentados" },
    { prefix: "+", value: 18, suffix: '', label: "<b>Portos</b> atendidos no brasil" },
    { prefix: "+", value: 100, label: "<b>Clientes</b> no brasil" },
    { prefix: "+", value: 12, suffix: "Milhões", label: "<b>Acessos</b> controlados" },
    { prefix: "+", value: 9, suffix: "Milhões", label: "<b>Agendamentos</b> realizados" },
];

const slides = [
    {
        title: 'Sistema completo de grãos',
        logo: 'clients_iport/tesc.png',
        details: `<b>Resultados obtidos:</b> Em 2023, com um plano de expansão em curso, o
        TESC focou na ampliação da infraestrutura para aumentar o mix e o
        volume de carga movimentada, com ênfase no recebimento,
        armazenamento e carregamento de granel sólido para exportação. Diante
        dos desafios dessa nova fase operacional, a adoção de tecnologia foi
        crucial para automatizar processos e atender às novas demandas.
        Nos primeiros dez meses de 2024, o terminal atingiu uma marca histórica,
        superando a movimentação total de 2023, alcançando 4,688 milhões de
        toneladas, superando a marca de 4,476 milhões registrada no ano anterior.
        As soluções da iPORT foram fundamentais, auxiliando desde a entrada de
        veículos e cargas com o iGATE até a gestão completa com o iCARGA WMS,
        focando no Sistema de Grãos do Terminal Portuário Santa Catarina (TESC).`,
        photo: 'cases/tesc.png',
    },
    {
        title: 'Eficiência operacional',
        logo: 'clients_iport/portos_do_parana.png',
        details: `Em 2024, a Portos do Paraná enfrentou adversidades climáticas e superou
        desafios operacionais para registrar a maior movimentação de cargas de sua
        história: 66.769.001 toneladas, um crescimento de 2,1% em relação ao ano
        anterior. Esse volume impressionante corresponde a 80% de toda a produção de
        grãos do Paraná, Santa Catarina e Rio Grande do Sul colhidos na safra do ano.
        <br/><br/>
        Dentre os 40 milhões de toneladas exportadas, os destaques foram soja,
        contêineres e açúcar a granel. Já nas 26,7 milhões de toneladas importadas,
        fertilizantes, contêineres e derivados de petróleo lideraram as movimentações.
        Outro ponto de destaque foi o aumento em 23% nas cargas gerais e 29% nos
        veículos movimentados, reflexo direto de estratégias de expansão e
        investimentos contínuos em inovação.
        <br/><br/>
        A automação e a tecnologia implementadas na conferência de cargas de toda a
        movimentação aceleraram a conformidade do porto com as exigências
        regulatórias, garantindo maior eficiência nos processos e foco em aspectos
        cruciais como precisão, agilidade e segurança operacional.`,
        photo: 'cases/parana.png',
    },
    {
        title: 'Expansão com segurança',
        logo: 'clients_iport/atem.png',
        details: `A Atem Distribuidora, que integra um dos maiores grupos nacionais de energia
        e logística, triplicou sua movimentação de combustíveis no Pará últimos seis
        meses, atingindo 30 milhões litros/mês. O aumento expressivo na
        comercialização de combustíveis foi devido, principalmente, aos investimentos
        realizados no Pará em infraestrutura e tecnologia.
        <br/><br/>
        O principal marco foi a implantação do primeiro terminal de uso privado (TUP)
        para abastecimento de combustível em Belém e a construção da segunda maior
        base de armazenamento de derivados de petróleo e etanol do Estado, com
        capacidade de 74 milhões de litros.
        Desde fevereiro, as novas estruturas já movimentaram mais de 135 milhões de
        litros de combustíveis, consolidando a Atem como um dos principais players do
        mercado local. A iPORT Solutions apoiou a modernização das operações. A
        implementação de soluções avançadas proporcionou maior segurança e
        agilidade, enquanto a automação de processos garantiu conformidade
        regulatória com os órgãos anuentes. O controle de acesso aprimorado otimizou
        a gestão de pessoas e veículos, trazendo maior transparência e contribuindo
        para a agilidade e segurança em todas as etapas da operação.`,
        photo: 'cases/atem.png',
    },
    {
        title: 'Escalabilidade dos fluxos operacionais',
        logo: 'clients_iport/carmo_energy.png',
        details: `
        Com expansão para todo o estado de Sergipe, a Carmo Energy investiu R$ 200
        mi e gerou 3.300 novos empregos diretos e indiretos. A continuidade da
        produção no Polo Carmópolis até 2052 e o investimento previsto de US$ 596
        milhões até 2032 reforçam seu compromisso com o desenvolvimento
        econômico local.
        <br/><br/>
        Esse crescimento exigiu uma adaptação na escalabilidade dos fluxos
        operacionais e uma gestão mais eficiente das operações, garantindo que as
        novas demandas fossem atendidas com agilidade e segurança.
        <br/><br/>
        Para apoiar essa expansão, a Carmo Energy adotou tecnologias avançadas de
        controle de acesso. As soluções da iPORT Solutions proporcionam uma gestão
        mais segura e eficiente das operações, com monitoramento contínuo e
        automatizado, adaptando-se às novas necessidades de controle em áreas
        sensíveis e otimizando o fluxo de pessoas e veículos, mantendo altos padrões
        de segurança e conformidade regulatória.`,
        photo: 'cases/carmo.png',
    },
    {
        title: 'Inovação operacional',
        logo: 'clients_iport/tcp.png',
        details: `
        O Terminal de Contêineres de Paranaguá alcançou um marco significativo ao
        movimentar 1,5 milhão de TEUs em 2024, destacando-se como referência em
        eficiência e inovação logística. Esse resultado reflete a aplicação de R$370
        milhões em investimentos estratégicos e a integração de tecnologias
        avançadas, que reestruturaram e modernizaram suas operações.
        <br/><br/>
        Melhorias no processo operacional como a inclusão de processos
        automatizados, como a conferência remota, e a aquisição de novos
        equipamentos, como guindastes RTG e caminhões de terminal, a TCP
        otimizou as operações de carga e descarga, permitindo maior segurança e
        redução de custos, além da integração completa.`,
        photo: 'cases/tcp.png',
    },
    {
        title: 'Operações ship to ship',
        logo: 'clients_iport/transpetro.png',
        details: `
        Com presença estratégica em 13 localidades, a Transpetro consolidase 
        como líder brasileira em operações ship to ship, alcançando 70% do
        mercado nacional em 2024. Esse serviço, que transfere petróleo e
        derivados entre navios sem a necessidade de armazenamento
        terrestre, oferece soluções logísticas que podem reduzir custos
        operacionais em até 30%.
        <br/><br/>
        A integração tecnológica desempenha um papel crucial nesse
        processo. A transmissão de dados em tempo real e de forma
        automatizada para órgãos anuentes garante conformidade regulatória
        e traz vantagens competitivas, otimizando a gestão e o gerenciamento
        operacional. Essa abordagem assegura decisões mais ágeis e uma
        comunicação confiável com toda a cadeia logística.`,
        photo: 'cases/transpetro.png',
    },
    {
        title: 'Produtividade e modernização',
        logo: 'clients_iport/login.png',
        details: `
        Em 2024, o Terminal Portuário de Via Velha alcançou resultados
        expressivos, registrando um aumento de 39% na produtividade
        operacional. As modernizações realizadas também reduziram em 18% o
        tempo médio de permanência das embarcações, ampliando a
        rotatividade e a capacidade de atendimento. Outro marco foi o
        crescimento de 15% no volume médio de contêineres movimentados
        por escala.
        <br/><br/>
        Esses avanços refletem os investimentos do terminal em tecnologia e
        modernização, priorizando a eficiência operacional, a automação de
        processos e a redução de interações manuais. Um exemplo é a
        digitalização do fluxo de entrada e conferência de cargas, agora realizada
        remotamente, otimizando a movimentação e conferindo agilidade às
        operações.`,
        photo: 'cases/log_in.png',
    },
];

// Centraliza o acesso ao jQuery global carregado pelos scripts legados em nuxt.config.ts.
const getLegacyJquery = () => (window as any).jQuery || (window as any).$;

// Aguarda os plugins do Bootstrap e do Owl serem registrados antes de inicializar os carrosseis.
const waitForLegacyCarouselScripts = async (attempts = 40, interval = 100) => {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        const jquery = getLegacyJquery();

        if (jquery?.fn?.carousel && jquery?.fn?.owlCarousel) return jquery;

        await new Promise((resolve) => window.setTimeout(resolve, interval));
    }

    return null;
};

// Inicializa manualmente o carousel principal para nao depender somente do data-ride do Bootstrap.
const initHeroCarousel = (jquery: any) => {
    const carousel = jquery('#customCarousel1');

    if (!carousel?.length || !jquery.fn?.carousel) return;

    carousel.carousel({
        interval: 6000,
        ride: 'carousel',
        pause: 'hover',
    });
};

const initLinkedInCarousel = () => {
    const jquery = getLegacyJquery();
    const carousel = jquery?.('.client_owl-carousel');

    if (!carousel?.length || !jquery.fn?.owlCarousel) return;

    if (carousel.hasClass('owl-loaded')) {
        // Remove a estrutura gerada pelo Owl antes de recriar, evitando wrappers duplicados no hot reload.
        carousel.trigger('destroy.owl.carousel');
        carousel.removeClass('owl-loaded owl-hidden');
        carousel.find('.owl-stage-outer').children().unwrap();
    }

    carousel.owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },
    });
};

onMounted(async () => {
    try {
        posts.value = linkedinPosts.data;
        await nextTick();
        const jquery = await waitForLegacyCarouselScripts();

        if (jquery) {
            initHeroCarousel(jquery);
        }

        initLinkedInCarousel();
    } catch (e) {
        console.log(e);
    }
});

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries: any) => {
            if (entries[0].isIntersecting) {
                counters.forEach((c, i) => animateCount(i, c.value));
                observer.disconnect(); // só anima 1x
            }
        },
        { threshold: 0.3 } // ativa quando 30% da seção aparece
    );

    if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
    const jquery = getLegacyJquery();
    const carousel = jquery?.('.client_owl-carousel');

    if (carousel?.hasClass('owl-loaded')) {
        carousel.trigger('destroy.owl.carousel');
    }
});

const formatDate = (timestampValue: any) => {
    const date = new Date(timestampValue);
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// easing bem lento no final
const easeOutCubic = (t: any) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t: any) => 1 - Math.pow(1 - t, 5);

const animateCount = (index: any, target: any, duration = 6000) => {
    const start = performance.now();

    const step = (timestamp: any) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        // aqui você escolhe qual easing usar
        const eased = easeOutQuart(progress); // bem mais suave no final

        // @ts-ignore
        displayValues.value[index] = (target * eased).toFixed(
            target % 1 === 0 ? 0 : 1
        );

        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

const hidePlaceholder = () => {
    // Esconde a imagem quando o vídeo carrega
    const placeholder = document.querySelector('.placeholder-image') as HTMLElement;
    if (placeholder) {
        placeholder.style.opacity = '0';
        placeholder.style.transition = "opacity 0.5s ease";
        setTimeout(() => placeholder.style.display = 'none', 500); // Remove da DOM após o fade-out
    }
}

const categories = computed(() => {
  const set = new Set<string>();

  for (const m of modulesJson) {
    const cats = Array.isArray(m.category) ? m.category : [];
    for (const c of cats) {
      if (typeof c === "string" && c.trim()) set.add(c.trim());
    }
  }

  // opcional: ordenar
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
//   return Array.from(set);
});

const filteredModules = computed(() => {
  const categoria = selectedCategory.value;
  if (!categoria) return modulesJson;

  return modulesJson.filter(m =>
    Array.isArray(m.category) && m.category.includes(categoria)
  );
});

// opcional: toggle (clicou de novo na mesma, desmarca)
function toggleCategory(categoria: string) {
  selectedCategory.value = (selectedCategory.value === categoria ? null : categoria);
}

</script>


<style lang="scss" scoped>
@use '@/style.scss' as style;

body {

    .btn1 {
        background-color: style.$white !important;
        color: style.$primary !important;
        font-weight: bold;
        border-radius: 7px !important;
    }

    .hero_area {
        i {
            margin-right: 10px;
        }

        @media screen and (max-width: 992px) {
            background: linear-gradient(130deg, style.$secondary, style.$primary);
        }
    }

    @media screen and (max-width: 767px) {
        .slider_section {
            margin-top: 35%;

            p {
                display: none;
            }
        }

    }

    .service_section {

        .tos {
            margin-top: 2rem;

            #categories {
                display: flex;
                justify-content: start;
                gap: 1rem;
                flex-wrap: wrap;
                margin: 0 2rem 2rem 2rem;

                .category-button {
                    background-color: rgba(style.$dark, .1);
                    border: none;
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #818181;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    transition: background-color 0.3s ease, color 0.3s ease;

                    &.active,
                    &:hover {
                        background-color: #55B8D1;
                        color: #fff;
                    }
                }
            }

            .grid-tos {
                display: grid;
                gap: 1.7rem;
                grid-template-columns: repeat(auto-fit, minmax(120px, 120px));
                justify-items: center;
                margin: 0 2rem;

                >div {
                    aspect-ratio: 1;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background-color: #eaeaea;
                    border-radius: 20px;
                    aspect-ratio: 1;
                    box-shadow: 5px 5px 20px #bebebe,
                        -5px -5px 20px #ffffff;
                    transition: box-shadow 0.5s ease, transform 0.5s ease; // 👈 transição suave
                    cursor: pointer;



                    &:hover, &.selected {
                        box-shadow: inset 3px 3px 10px style.$third, inset -3px -3px 10px #ffffff;
                        transition: box-shadow 0.3s ease, transform 0.3s ease; // 👈 transição suave
                        background-color: style.$third2;


                        h3 {
                            color: style.$white;
                        }

                        img {
                            opacity: 1;
                            filter: brightness(0) saturate(100%) invert(100%) sepia(36%) saturate(589%) hue-rotate(148deg) brightness(95%) contrast(92%);
                        }
                    }
                    
                    img {
                        width: 40%;
                        height: 40%;
                        opacity: .8;
                        filter: brightness(0) saturate(100%) invert(72%) sepia(36%) saturate(589%) hue-rotate(148deg) brightness(85%) contrast(92%);
                    }

                    h3 {
                        font-size: 1.2rem;
                        font-weight: bolder;
                        color: #55B8D1;
                        font-family: 'Montserrat', sans-serif;
                    }
                }
            }

            @media screen and (max-width: 769px) {
            }
            
            @media screen and (max-width: 1199px) {
                margin-top: 1.5rem;
                // flex-direction: column-reverse;
                .title {
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
            }

            .title {
                align-content: center;
                color: style.$secondary;
                display: flex;
                flex-direction: column;


                h5 {
                    font-size: 2rem;
                    // color: style.$primary;
                    text-transform: none;
                    margin: 0;
                }

                .row {
                    margin: 0;
                    flex-wrap: nowrap;
                    margin-bottom: 25px;

                    i {
                        display: flex;
                        font-size: 2rem;

                        &::before {
                            align-self: center;
                        }
                    }

                    span {
                        text-align: start;
                    }
                }

                .detail-box{
                    padding: 1rem;
                    padding-top: 0;

                    a {
                        width: 100%;
                        padding: 15px;
                        background-color: rgba(style.$yellow, .7);
                        border-radius: 7px;
    
                        &:hover {
                            color: style.$secondary;
                        }
                    }

                    .text-box{
                        margin-top: 1rem;
                        padding: 2rem;
                        border-radius: 1rem;
                        background-color: #2125291a;
                    }
                } 
            }
        }
    }

    @media (max-width: 767px) {

        .carousel-control-next,
        .carousel-control-prev {
            align-items: start;

            span {
                opacity: .3;
            }
        }
    }

    @media (max-width: 992px) {
        .service_section {
            padding-top: 10%;
        }

    }

    .about_section {
        .infos {
            display: flex;
            position: relative;
            align-items: stretch;
            margin-bottom: 5rem;

            >div {
                overflow: hidden;

                .box {
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    min-height: 140px;
                    height: 100%;
                    // border: 3px double rgba($color: style.$third, $alpha: .4);
                    background-color: #eaeaea22;
                    border-radius: 10px;
                    padding: 1.5rem;

                    >div {
                        display: flex;
                        font-size: 2rem;
                        gap: 1rem;
                        margin-bottom: 1rem;

                        i {
                            flex: 1;
                            text-align: center;
                            align-content: center;
                        }

                        h3 {
                            flex: 4;
                            font-size: 1.2rem;
                            font-weight: bolder;
                        }

                    }

                    span {
                        text-align: center;
                    }
                }


            }

            @media screen and (max-width: 992px) {
                gap: 15px;

                >div {
                    i {
                        position: absolute;
                        opacity: .3;
                        right: 3rem;
                        top: 25%;
                        font-size: 4rem;
                    }
                }
            }
        }

        .list-group {
            text-align: start;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;

            :before {
                content: '';
                background-color: rgba($color: style.$secondary, $alpha: .3);
                filter: blur(1px);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
                /* Garante que fique atrás do conteúdo */
            }

            li {
                position: relative;
                /* Necessário para posicionar o ::before corretamente */
                background-color: transparent;
                border: none;

                /* Estilo padrão para o conteúdo interno */
                z-index: 1;
            }
        }
    }

    #advantages{
        margin-top: 5rem;
    }

    .why-section{
        background-size:     cover;
        background-repeat:   no-repeat;
        background-position: left center;

        .heading_container{
            h2>span{
                color: #D9D9D9
            }
        }
    }

    .partner-section {
        .sectionRef{
            display: flex;
            justify-content: start;
        }
        
        .client-map {
            display: flex;
            justify-content: end;
            position: relative;
            
            img {
                width: 100%;
            }
        }
        
        .numbers-text{
            align-self: start;
            color: style.$white;
            font-size: 1.3rem;
        }

        .numbers {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            > div {
                position: relative;
                width: 100%;
                background: rgba(217, 217, 217, 0.5);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-radius: 1rem;
                padding: 0.7rem;
                display: flex;
                gap: 0.7rem;
                min-height: 100px;
                border: 1px solid rgba(255, 255, 255, 0.18);
                box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.18),
                0 8px 24px rgba(0, 0, 0, 0.06);

                &::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1px;
                background: linear-gradient(
                    135deg,
                    rgba(255, 255, 255, 0.35),
                    rgba(255, 255, 255, 0.08),
                    rgba(255, 255, 255, 0.02)
                );
                -webkit-mask: 
                    linear-gradient(#fff 0 0) content-box,
                    linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
                }

                .number {
                    flex: 1;
                    align-content: center;
                    font-weight: bold;

                    * {
                        margin-bottom: 0;
                        text-align: center;
                    }

                    h3 {
                        font-size: 2rem;
                        color: style.$primary;
                        font-weight: bolder;
                    }

                    p {
                        font-size: 1.5rem;
                    }
                }

                .text {
                    flex: 2;
                    text-align: start;
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;

                    p {
                        margin: 0;
                    }
                }
            }
        }
    }

    .post_section {
        p.caption {
            display: -webkit-box;
            // max-width: 200px;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .info_detail {
        padding: 0 20px;

        .info_social {
            justify-content: start;

            a {
                margin: 0 20px;
            }
        }

        @media screen and (max-width: 767px) {}
    }

    .map-img {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
            display: flex;
            justify-content: center;
        }

        img {
            width: 90%;
            border-radius: 10px;
        }
    }

    #isos {
        display: flex;
        margin: 2rem 1rem;
    }

    .iso {
        opacity: .8;
        padding: 0;

        img {
            padding: 5px;
            filter: grayscale(1);
            object-fit: contain;

            &:hover {
                filter: none;
                opacity: 1;
                transition: filter 0.3s ease, opacity 0.3s ease;
            }
        }
    }

    .info_map {
        display: flex;
        flex-direction: column;
        justify-content: center;

        a {
            color: #d9d9d9;

            &:hover {
                color: style.$third;
            }
        }
    }


    #u3da {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 120px;



        @media screen and (max-width: 992px) {
            width: 100px;
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
}
</style>
