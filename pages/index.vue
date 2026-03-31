<template>
  <div class="bg-white flex flex-col items-center justify-center">
    <Header />
    <Hero />
    <About />
    <Projets />
    <LatestWriteups />
    <!-- <Contact /> -->
    <Footer />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Eliott Mieze - Portfolio",
  ogTitle: "Eliott Mieze - Portfolio",
  description: "The portfolio of Eliott, student at EPITA.",
  ogDescription: "The portfolio of Eliott, student at EPITA.",
});
</script>
