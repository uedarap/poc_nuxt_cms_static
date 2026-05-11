<template>
    <transition name="cookie-banner">
        <div v-if="showBanner" class="cookie-banner hidden-initially">
            <p class="col-9">
                Usamos cookies para melhorar sua experiência. Ao aceitar, você concorda com o uso de cookies. Todos os
                dados são preservados de acordo com a LGPD. &nbsp;
                (<a href="https://www.dropbox.com/scl/fi/foch8jwsc3ycftfkxtofu/Politica-de-Privacidade-LGPD.pdf?rlkey=4aj3s090zav4jppk58g3o6ic7&e=1&dl=0"
                    target="_blank">Política de Privacidade</a>)
            </p>
            <div class="actions col-3">
                <button @click="acceptCookies" class="btn btn-primary"
                    style="background-color: #164B92; border-color: #164B92;">Aceitar</button>
                <button @click="declineCookies" class="btn btn-secondary">Recusar</button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            showBanner: false,
        };
    },
    created() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            this.showBanner = true;
            setTimeout(() => {
                document.querySelector('.cookie-banner').classList.remove('hidden-initially');
            }, 100); // Remova a classe após o DOM ser atualizado
        }else if (consent === 'accepted') {
            this.enableOptionalCookies();
        } else if (consent === 'declined') {
            this.disableOptionalCookies();
        }
    },
    methods: {
        acceptCookies() {
            localStorage.setItem('cookieConsent', 'accepted');
            this.enableOptionalCookies();
            this.showBanner = false;
        },
        declineCookies() {
            localStorage.setItem('cookieConsent', 'declined');
            this.disableOptionalCookies();
            this.showBanner = false;
        },
        enableOptionalCookies() {
            // Exemplo: Carregar Google Analytics
            // (function (i, s, o, g, r, a, m) {
            //     i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            //         (i[r].q = i[r].q || []).push(arguments)
            //     }, i[r].l = 1 * new Date(); a = s.createElement(o),
            //         m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            // })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
            // ga('create', 'UA-XXXXX-Y', 'auto');
            // ga('send', 'pageview');
        },
        disableOptionalCookies() {
            // Exemplo: Bloqueia o envio de dados para cookies opcionais
            console.log('Cookies opcionais desativados.');
            // Opcional: Remova cookies analíticos existentes
            document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }

};
</script>

<style lang="scss" scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f5f5f5;
    padding: 1rem;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;

    button {
        width: 100px;
        height: 45px;
    }
}

p {
    margin: 0;
}

/* Animações de Transição */
.hidden-initially {
    transform: translateY(100%);
    opacity: 0;
}

.cookie-banner-enter-active,
.cookie-banner-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.cookie-banner-enter {
    transform: translateY(100%);
    opacity: 0;
}

.cookie-banner-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
