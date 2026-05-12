import { defineNuxtConfig } from "nuxt/config";

const repositoryName = "poc_nuxt_cms_static";
const baseURL = process.env.NUXT_APP_BASE_URL || "/";
const siteUrl =
    process.env.NUXT_PUBLIC_SITE_URL ||
    `https://example.github.io/${repositoryName}`;

export default defineNuxtConfig({
    srcDir: ".",
    modules: ["@nuxt/content"],
    compatibilityDate: "2026-04-22",
    app: {
        baseURL,
        head: {
            htmlAttrs: {
                lang: "pt-BR",
            },
            title: "iPORT Solutions",
            bodyAttrs: {
                class: "is-preload",
            },
            meta: [
                { charset: "UTF-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, user-scalable=no",
                },
                {
                    name: "description",
                    content: "Saas completa para gestão portuaria",
                },
                { name: "keywords", content: "iport" },
                { name: "theme-color", content: "#1A1A1A" },
                {
                    name: "apple-mobile-web-app-status-bar-style",
                    content: "#1A1A1A",
                },
            ],
            link: [
                {
                    rel: "icon",
                    type: "image/svg+xml",
                    href: `${baseURL}favicon.svg`,
                },
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap",
                },
            ],
            script: [
                {
                    // Carrega o jQuery legado antes dos plugins que dependem de window.jQuery.
                    src: `${baseURL}js/jquery-3.4.1.min.js`,
                    defer: true,
                },
                {
                    // Ativa os componentes do Bootstrap 4, incluindo o carousel #customCarousel1.
                    src: `${baseURL}js/bootstrap.js`,
                    defer: true,
                },
                {
                    // Registra $.fn.owlCarousel para o carousel de posts dentro de .carousel-wrap.
                    src: `${baseURL}js/owl.carousel.min.js`,
                    defer: true,
                },
                {
                    // Mantem o plugin de popup disponivel para qualquer uso legado da landing page.
                    src: `${baseURL}js/jquery.magnific-popup.min.js`,
                    defer: true,
                },
                {
                  innerHTML: `(function (w, d, s, l, i) {
                    w[l] = w[l] || [];
                    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                    var f = d.getElementsByTagName(s)[0],
                      j = d.createElement(s),
                      dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                    f.parentNode.insertBefore(j, f);
                  })(window, document, 'script', 'dataLayer', 'GTM-KGLHL7JH');`,
                },
                {
                  innerHTML: `(function(a,b,c,d){
                  try {
                     var e = b.head || b.getElementsByTagName("head")[0];
                     var f = b.createElement("script");
                     f.setAttribute("src", c);
                     f.setAttribute("charset", "UTF-8");
                     f.defer = true;
                     a.neuroleadId = d;
                     e.appendChild(f);
                  } catch(g) {}
                  })(window, document, "https://cdn.leadster.com.br/neurolead/neurolead.min.js", "tW6q9KhhNDVF5ETxacIaNzvIw");`,
                },
            ],
            noscript: [
                {
                    innerHTML:
                        '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGLHL7JH" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
                    tagPosition: "bodyOpen",
                }
            ],
            style: [
                {
                    innerHTML: ".nld-chatbot{z-index:999!important;}",
                },
            ],
        },
    },
    runtimeConfig: {
        public: {
            siteUrl,
            repositoryName,
        },
    },
    css: [
        "~/assets/css/bootstrap.css",
        "~/assets/css/font-awesome.min.css",
        "~/assets/css/style.css",
        "~/assets/css/responsive.css",
    ],
    // nitro: {
    //   preset: 'github_pages',
    //   prerender: {
    //     crawlLinks: true,
    //     routes: ['/', '/blog']
    //   }
    // },
    // routeRules: {
    //   '/': { prerender: true },
    //   '/blog': { prerender: true },
    //   '/blog/**': { prerender: true }
    // },
    typescript: {
        strict: true,
    },
});
