<script setup lang="ts">
import projets from "~/public/data/projets";
</script>

<template>
  <section class="py-20 items-center flex flex-col" id="projets">
    <h1 class="pb-10 text-4xl font-bold font-poppins text-gray-800">
      Mes projets
    </h1>
    <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10" />
    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        <div
          v-for="projet in projets"
          :key="projet.id"
          class="group bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <img
            :src="projet.image"
            alt="projet.title"
            class="w-full h-48 object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
          <div class="p-6">
            <h3 class="font-bold text-xl text-gray-800">{{ projet.title }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ projet.description }}</p>
            <a
              :href="projet.link"
              target="_blank"
              class="block text-center bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-800 transition duration-300 ease-in-out"
              >Voir le projet</a
            >
            <a
              :href="projet.link2"
              v-if="projet.link2"
              target="_blank"
              class="block text-center text-blue-500 hover:text-white hover:bg-slate-700 rounded px-4 py-2 mt-2"
              >Voir le code source</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
