<template>
    <!-- Secao reutilizavel de contato: agrupa comercial, enderecos e redes para uso em qualquer pagina. -->
    <section id="contact" class="info_section layout_padding2">
        <div class="container">
            <div class="row">
                <!-- Coluna comercial/suporte: concentra os canais diretos de atendimento da iPORT. -->
                <div class="col-md-6 col-lg-4 info_col">
                    <div class="info_contact">
                        <div class="contact_link_box">
                            <h4 style="margin: 0;">Comercial</h4>

                            <!-- CTA principal para facilitar o contato rapido via WhatsApp. -->
                            <div class="mt-3 mb-3">
                                <a href="https://wa.me/+551333852482" target="_blank" rel="noopener"
                                    style="color: #00204abb; font-size: 1.2rem; font-weight: bolder; display: flex; justify-content: center; background-color: #fecf1d; padding: 1rem; border-radius: 5px;">
                                    Falar com nossos especialistas
                                </a>
                            </div>

                            <!-- Telefones comerciais renderizados lado a lado no desktop. -->
                            <div style="display: flex; gap: 2rem; justify-content: space-between;">
                                <a href="https://wa.me/+551333852482" target="_blank" rel="noopener"
                                    style="display: flex; gap: 7px;">
                                    <i class="fa fa-whatsapp mt-1" aria-hidden="true" style="font-size: 1.7rem;"></i>
                                    <div style="align-content: center;">
                                        <span>
                                            <b>(13) 3385 - 2482</b>
                                        </span>
                                    </div>
                                </a>

                                <a href="tel:+5513998009786" style="display: flex; gap: 7px;">
                                    <i class="fa fa-phone mt-1" aria-hidden="true" style="font-size: 1.7rem;"></i>
                                    <div style="align-content: center;">
                                        <span>
                                            (13) 99800 - 9786
                                        </span>
                                    </div>
                                </a>
                            </div>

                            <!-- Email comercial mantido separado para preservar o respiro visual do layout original. -->
                            <div class="my-1">
                                <a href="mailto:comercial@iportsolutions.com.br">
                                    <i class="fa fa-envelope" aria-hidden="true" style="font-size: 1.5rem;"></i>
                                    <span>
                                        comercial@iportsolutions.com.br
                                    </span>
                                </a>
                            </div>

                            <h4 class="mt-5 mb-3" style="margin: 0;">Suporte</h4>

                            <!-- Canais de suporte agrupados em coluna para leitura rapida. -->
                            <div style="display: flex; flex-direction: column;">
                                <a href="https://chamado.iportsolutions.com.br/support/login" target="_blank"
                                    rel="noopener" style="display: flex; gap: 7px;">
                                    <i class="fa fa-desktop mt-1" aria-hidden="true" style="font-size: 1.7rem;"></i>
                                    <div style="align-content: center;">
                                        <span>
                                            <b>Abrir Chamado</b>
                                        </span>
                                    </div>
                                </a>
                                <a href="tel:+551333852483" style="display: flex; gap: 7px;">
                                    <i class="fa fa-phone mt-1" aria-hidden="true" style="font-size: 1.7rem;"></i>
                                    <div style="align-content: center;">
                                        <span>
                                            <b>(13) 3385 - 2483</b>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coluna de enderecos: lista unidades e reutiliza a imagem de mapa do projeto. -->
                <div class="col-md-6 col-lg-4 info_col info_map">
                    <h4>Endereços</h4>
                    <div style="display: flex; gap: 15px;">
                        <i class="fa fa-map-marker mt-1" aria-hidden="true"></i>
                        <div>
                            <div id="adrs_1">
                                <a href="https://maps.app.goo.gl/hscK6XAj6p9vEoXr7" target="_blank" rel="noopener">
                                    <span><b>Santos</b> (Tribuna Square)</span><br />
                                    <span>Rua Amador Bueno, 333</span><br />
                                    <span>Salas 1207 / 1214</span><br />
                                </a>
                            </div>
                            <div id="adrs_2" class="mt-2">
                                <a href="https://maps.app.goo.gl/9dF7DZB1zqFmqAYY7" target="_blank" rel="noopener"
                                    style="margin-top: 10px;">
                                    <span><b>São Paulo</b> (Berrini Lavra)</span><br />
                                    <span>Av. Engenherio Luís Carlos Berrini, 1140</span><br />
                                    <span>Salas 61 / 62</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Imagem clicavel leva para a unidade principal no Google Maps. -->
                    <div class="map-img my-3 mt-4">
                        <a href="https://maps.app.goo.gl/hscK6XAj6p9vEoXr7" target="_blank" rel="noopener">
                            <img :src="publicAsset('/images/map.png')" alt="Mapa com localizacao da iPORT">
                        </a>
                    </div>
                </div>

                <!-- Coluna social: centraliza os perfis oficiais para fechar a area de contato. -->
                <div class="col-md-6 col-lg-4 info_col">
                    <div class="info_detail">
                        <h4 style="text-align: center;">
                            Siga nossas redes
                        </h4>
                        <div class="info_social justify-content-center">
                            <a href="https://www.linkedin.com/company/iportsolutions" target="_blank" rel="noopener">
                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/iportsolutions/" target="_blank" rel="noopener">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="https://web.facebook.com/iPortSolutions" target="_blank" rel="noopener">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Resolve o mapa em public/ com o baseURL correto no GitHub Pages.
const publicAsset = usePublicAsset()
</script>

<style lang="scss" scoped>
@use '@/style.scss' as style;

/* Ajustes locais que antes ficavam na home e agora acompanham o componente em outras telas. */
.info_detail {
    padding: 0 20px;

    .info_social {
        justify-content: start;

        a {
            margin: 0 20px;
        }
    }
}

/* Mantem a imagem de mapa centralizada e com cantos arredondados no bloco de enderecos. */
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

/* Garante contraste dos links de endereco dentro do fundo escuro da secao global. */
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
</style>
