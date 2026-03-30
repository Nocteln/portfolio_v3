<template>
  <div class="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto w-full">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight poppins">CTF Write-ups</h1>
        <NuxtLink to="/" class="text-indigo-600 hover:text-indigo-800 font-medium">Retour au Portfolio</NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="article in writeups" 
          :key="article._path" 
          :to="article._path"
          class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Background Image -->
          <div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" :style="{ backgroundImage: `url(${article.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'})` }"></div>
          
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          
          <!-- Content -->
          <div class="relative p-6 h-full flex flex-col justify-end min-h-[300px]">
            <div class="flex justify-between items-center mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500 text-white shadow">
                {{ article.platform || 'CTF' }}
              </span>
              <span class="text-xs text-gray-300 font-medium">
                {{ article.date ? new Date(article.date).toLocaleDateString('fr-FR') : 'Date inconnue' }}
              </span>
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-1 shadow-sm leading-tight group-hover:text-indigo-300 transition-colors">
              {{ article.title }}
            </h3>
            
            <p class="text-sm text-gray-200 mt-1 font-medium italic">
              {{ article.ctf || 'TBD CTF' }}
            </p>
          </div>
        </NuxtLink>
      </div>
      
      <div v-if="writeups.length === 0" class="text-center py-20 text-gray-500">
        Aucun write-up trouvé pour le moment.
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: writeups } = await useAsyncData('writeups', () => {
  return queryContent('writeups').sort({ date: -1 }).find()
})

useSeoMeta({
  title: "CTF Write-ups - Portfolio",
  description: "Liste de mes write-ups de Capture The Flag (CTF).",
})
</script>
