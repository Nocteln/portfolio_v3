<template>
  <div class="bg-white flex flex-col items-center justify-center">
    <Header />
    <Hero />
    <About />
    <Projets />
    <!-- <Contact /> -->
    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Eliott Mieze - Portfolio",
  ogTitle: "Eliott Mieze - Portfolio",
  description: "Le portfolio d'eliot, étudiant à épita et apprenti dev.",
  ogDescription: "Le portfolio d'eliot, étudiant à épita et apprenti dev.",
});
</script>
