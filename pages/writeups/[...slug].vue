<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/writeups" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Retour aux write-ups
      </NuxtLink>
      
      <article v-if="doc" class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="w-full h-64 md:h-80 bg-cover bg-center relative" :style="{ backgroundImage: `url(${doc.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'})` }">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <div class="flex items-center space-x-3 mb-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-lg">
                {{ doc.platform }}
              </span>
              <span class="text-sm font-medium text-gray-200">
                {{ doc.date ? new Date(doc.date).toLocaleDateString('fr-FR') : '' }}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight shadow-sm poppins">{{ doc.title }}</h1>
            <p class="text-lg text-gray-200 mt-2 font-medium">{{ doc.ctf }}</p>
          </div>
        </div>
        
        <div class="p-8 md:p-12">
          <ContentRenderer :value="doc" class="prose prose-indigo prose-lg max-w-none prose-headings:font-poppins prose-a:text-indigo-600 hover:prose-a:text-indigo-500" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: doc } = await useAsyncData(`article-${route.path}`, () => {
  return queryContent(route.path).findOne()
})

if (doc.value) {
  useSeoMeta({
    title: `${doc.value.title} - CTF Write-up`,
    ogTitle: `${doc.value.title} - CTF Write-up`,
    description: doc.value.description || `Read my detailed write-up on the ${doc.value.title} challenge from the ${doc.value.ctf} CTF.`,
    ogDescription: doc.value.description || `Read my detailed write-up on the ${doc.value.title} challenge from the ${doc.value.ctf} CTF.`,
    ogImage: doc.value.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000',
    twitterCard: 'summary_large_image',
  })
}
</script>
