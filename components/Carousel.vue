<template>
    <div style="width: 100%; height: 100%;">
        <swiper :spaceBetween="20" :breakpoints="breakpoints" :freeMode="true"
            :pagination="{ clickable: true, }" :modules="modules" class="mySwiper">
            <swiper-slide v-for="(slide, index) in slides" :key="index" @click="toggleSlide(index)"
                :class="{ 'selected': selectedSlide === index }">
                <div class="swiper-slide-in" :class="{ 'selected': selectedSlide === index }">
                    <div class="slide-bg" :class="{ selected: selectedSlide === index }">
                        <img :src="`./assets/img/${slide.photo}`" :alt="slide.title" />
                    </div>
                    <div class="touch" :style="{ display: selectedSlide === index ? 'none' : 'block' }">
                        <img src="@/images/touch.svg" alt="">
                    </div>
                    <transition name="fade" mode="out-in">
                        <div key="1" v-if="selectedSlide === index" class="slide-details">
                            <p v-html="slide.details"></p>
                            <!-- <button @click.stop="closeSlide">Fechar</button> -->
                        </div>
                        <div key="2" v-else class="slide-title">
                            <h4 v-html="slide.title"></h4>
                            <div class="img-logo"><img :src="`./assets/img/${slide.logo}`"  alt=""></div>
                        </div>
                    </transition>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>



<script>
import { ref, onMounted, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

export default {
    props: {
        slides: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    components: { Swiper, SwiperSlide },

    setup(props, { expose }) {
        const selectedSlide = ref(null);
        const length = ref(3); // Ref para armazenar dinamicamente o número de slides visíveis

        function toggleSlide(index) {
            selectedSlide.value = selectedSlide.value === index ? null : index;
        }

        function closeSlide() {
            selectedSlide.value = null;
        }

        expose({
            closeSlide, // Permite que o método seja chamado de fora do componente
        });

        const breakpoints = ref({
            1024: { slidesPerView: length.value, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 10 },
        });

        // Atualiza o valor de length e breakpoints quando `props.slides` muda
        const updateBreakpoints = () => {
            // length.value = props.slides.length < 5 ? props.slides.length : 5;
            breakpoints.value = {
                1024: { slidesPerView: length.value, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 10 },
                0: { slidesPerView: 1, spaceBetween: 10 },
            };
        };

        // Observa alterações no valor de slides
        watch(() => props.slides, updateBreakpoints, { immediate: true });

        // Atualiza os breakpoints ao montar o componente
        onMounted(updateBreakpoints);

        return {
            selectedSlide,
            toggleSlide,
            closeSlide,
            breakpoints,
            modules: [FreeMode, Pagination],
        };
    },
};
</script>



<style scoped lang="scss">
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    // background: #418e71;
    height: 300px;
    overflow: hidden;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    transition: width 0.3s ease;
    /* animação suave na mudança de largura */

}

.swiper-slide-in {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.swiper-slide-in.selected {
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mySwiper {
    width: 100%;
    /* deixe a altura automática para caber slides + paginação */
    height: auto;
    padding-bottom: 40px;
    /* espaço para a paginação aparecer */
}

/* Força a paginação ficar no centro embaixo */
.mySwiper .swiper-pagination {
    bottom: 10px !important;
    text-align: center;
}

// Deep selector para penetrar o scoped e aplicar o estilo nos elementos filhos que estão fora do escopo
::v-deep() {
    .swiper-pagination-bullet-active{
        background-color: #eaeaea !important;
    }
    
    .swiper-pagination-bullet{
        background-color: #eaeaea !important;
    }
}

.slide-title {

    color: #d9d9d9;
    text-wrap: wrap;
    margin: 0 15px;
    justify-items: center;

    h4 {
        font-size: 1.6rem;
        font-weight: 600;
    }

    .img-logo{
        width: 200px;
        background: #eaeaeab5;
        border-radius: 5px;
        margin-top: 2rem;
    }
}

.slide-details {
    width: 100%;
    overflow-y: scroll;
    padding: 20px;
    text-align: left;
    margin: 10px;

    p {
        overflow-wrap: break-word;
        line-height: normal;
        color: #d9d9d9;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: #d9d9d975;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.slide-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    z-index: -1;

    img {
        filter: saturate(0);
    }

    &::after {
        content: '';
        background-color: #0A2647;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        transition: opacity 0.3s ease; // anima apenas a opacidade
    }

    &.selected::after {
        opacity: .95;
    }
}

.touch{
    position: absolute;
    top: 5%;
    right: 0;
    width: 40px;
    z-index: 1;

    img{
        width: 70%;
        opacity: .7;
        filter: brightness(0) saturate(100%) invert(99%) sepia(2%) saturate(241%) hue-rotate(55deg) brightness(114%) contrast(84%);
    }
}
</style>