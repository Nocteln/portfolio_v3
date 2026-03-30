<template>
  <section class="py-20 bg-gray-50 w-full flex flex-col items-center" id="latest-writeups">
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h2 class="pb-10 text-4xl font-bold font-poppins text-gray-800 text-center">
        Derniers Write-ups CTF
      </h2>
      <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
        <NuxtLink 
          v-for="article in writeups" 
          :key="article._path" 
          :to="article._path"
          class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-[300px]"
        >
          <!-- Background Image -->
          <div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" :style="{ backgroundImage: `url(${article.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'})` }"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          
          <!-- Content -->
          <div class="relative p-6 h-full flex flex-col justify-end">
            <div class="flex justify-between items-center mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500 text-white shadow">
                {{ article.platform || 'CTF' }}
              </span>
              <span class="text-xs text-gray-300 font-medium whitespace-nowrap ml-2">
                {{ article.date ? new Date(article.date).toLocaleDateString('fr-FR') : 'Date inconnue' }}
              </span>
            </div>
            
            <h3 class="text-xl md:text-2xl font-bold text-white mb-1 shadow-sm leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
              {{ article.title }}
            </h3>
            
            <p class="text-sm text-gray-200 mt-1 font-medium italic truncate">
              {{ article.ctf || 'TBD CTF' }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <NuxtLink 
        to="/writeups" 
        class="block text-center bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-800 transition duration-300 ease-in-out font-poppins"
      >
        Voir tous les Write-ups
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const { data: writeups } = await useAsyncData('latest-writeups', () => {
  return queryContent('writeups').sort({ date: -1 }).limit(3).find()
})
</script>
