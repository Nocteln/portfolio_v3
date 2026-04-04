<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/writeups" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Retour aux write-ups
      </NuxtLink>
      
      <article v-if="doc" class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="w-full h-64 md:h-80 relative overflow-hidden bg-gray-900">
          <NuxtImg
            :src="doc.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'"
            alt="Cover"
            format="webp"
            sizes="100vw lg:1200px"
            width="1200"
            height="320"
            fetchpriority="high"
            preload
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <div class="flex items-center space-x-3 mb-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-lg">
                {{ doc.platform }}
              </span>
              <span v-if="doc.difficulty" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-rose-500 text-white shadow-lg">
                {{ doc.difficulty }}
              </span>
              <span class="text-sm font-medium text-gray-200">
                {{ doc.date ? new Date(doc.date).toLocaleDateString('fr-FR') : '' }}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight shadow-sm poppins">{{ doc.title }}</h1>
            <div class="flex items-center flex-wrap gap-x-2 mt-2">
              <p class="text-lg text-gray-200 font-medium">{{ doc.ctf }}</p>
              <a v-if="doc.ctf_link" :href="doc.ctf_link" target="_blank" rel="noopener noreferrer" class="text-indigo-300 hover:text-indigo-200 text-base font-medium transition-colors">
                (Lien vers le CTF)
              </a>
            </div>
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

<style scoped>
:deep(.prose) :not(pre) > code {
  background-color: #f3f4f6;
  color: #4f46e5;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
:deep(.prose) code::before,
:deep(.prose) code::after {
  content: none !important;
}
</style>
