<template>
  <div class="slider">
    <div class="slide-track">
      <div class="slide" v-for="(empresa, index) in empresas" :key="index">
        <img :src="getImagePath(empresa)" height="100" width="250" alt="" />
      </div>
    </div>
  </div>
</template>


<script setup>
const publicAsset = usePublicAsset()

const empresas = [
  'brado',
  'clia_emporio',
  'porto_sfs',
  'santos_brasil',
  'barra_do_rio',
  'dp_world',
  'tesc',
  'tgrao',
  'concais',
  'vetorial',
  'triunfo',
  'transpetro',
  'tcp',
  'suzano',
  'portocel',
  'magnesita',
  'clia',
  'eudmarco',
  'yara',
  'adonai',
  'copi',
  'fv',
  'appa',
  'rio_brasil',
  'carmo_energy',
  'atem',
  'portos_do_parana',
  'arcelormittal',
  'compass',
  'tora',
  'eldorado',
  'login'
]

// Criei essa função pra que quando tivermos uma build de produção, o caminho das imagens seja diferente do ambiente de desenvolvimento
// Isso ocorre pq quando usamos ":src" em um componente Vue, o Vite não consegue resolver o caminho relativo corretamente
function getImagePath(nome) {
  return publicAsset(`/images/clients_iport/${nome}.png`);
}

</script>


<style lang="scss" scoped>
@use '@/style.scss' as style;

@mixin white-gradient {
  background: linear-gradient(to right, rgba(217, 217, 217, 1) 0%, rgba(217, 217, 217, 0) 100%);
}

$animationSpeed: 100s;

// Animation
@keyframes scroll {
  0% {
    transform: translateX(100px);
  }

  50% {
    transform: translateX(calc(-250px * 22))
  }

  100% {
    transform: translateX(100px);
  }
}


// Styling
.slider {
  background: rgba($color: white, $alpha: .91);
  opacity: 0.8;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);
  height: 100px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100%;

  &::before,
  &::after {
    @include white-gradient;
    content: "";
    height: 100px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }

  &::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  &::before {
    left: 0;
    top: 0;
  }

  .slide-track {
    animation: scroll $animationSpeed linear infinite;
    display: flex;
    width: calc(250px * 14);
  }

  .slide {
    height: 100px;
    width: 250px;
  }
}
</style>
