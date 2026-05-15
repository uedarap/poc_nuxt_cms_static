<script setup lang="ts">
// Sobrescreve a imagem do Markdown para aplicar o baseURL do GitHub Pages em midias locais.
const props = defineProps<{
    src?: string
    alt?: string
    width?: string | number
    height?: string | number
}>()

const publicAsset = usePublicAsset()
</script>

<template>
    <img
        :src="props.src ? publicAsset(props.src) : undefined"
        :alt="props.alt || ''"
        :width="props.width"
        :height="props.height"
        loading="lazy"
        decoding="async"
    >
</template>
