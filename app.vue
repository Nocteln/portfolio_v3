<template>
  <NuxtPage />
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Eliott Mieze (Nocteln)` : 'Eliott Mieze (Nocteln) - Portfolio'
  },
  robots: 'index, follow',
  author: 'Eliott Mieze (Nocteln)',
  themeColor: '#ffffff'
})
</script>
