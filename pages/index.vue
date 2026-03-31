<template>
  <div class="bg-white flex flex-col items-center justify-center">
    <Header />
    <main class="flex flex-col items-center w-full">
      <Hero />
      <About />
      <Projets />
      <LatestWriteups />
      <!-- <Contact /> -->
    </main>
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
