<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <NuxtLink
          to="/writeups"
          class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to write-ups
        </NuxtLink>
        <button @click="isDark = !isDark" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700" aria-label="Toggle dark mode">
          <Icon :name="isDark ? 'i-ph-sun-bold' : 'i-ph-moon-bold'" class="text-xl" />
        </button>
      </div>

      <article
        v-if="doc"
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300"
      >
        <div class="w-full h-64 md:h-80 relative overflow-hidden bg-gray-900">
          <NuxtImg
            :src="
              doc.image ||
              'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
            "
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
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-lg"
              >
                {{ doc.platform }}
              </span>
              <span
                v-if="doc.difficulty"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-rose-500 text-white shadow-lg"
              >
                {{ doc.difficulty }}
              </span>
              <span class="text-sm font-medium text-gray-200">
                {{
                  doc.date ? new Date(doc.date).toLocaleDateString("en-US") : ""
                }}
              </span>
            </div>
            <h1
              class="text-4xl md:text-5xl font-extrabold text-white leading-tight shadow-sm poppins"
            >
              {{ doc.title }}
            </h1>
            <div class="flex items-center flex-wrap gap-x-2 mt-2">
              <p class="text-lg text-gray-200 font-medium">{{ doc.ctf }}</p>
              <a
                v-if="doc.ctf_link"
                :href="doc.ctf_link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-300 hover:text-indigo-200 text-base font-medium transition-colors"
              >
                (Link to CTF)
              </a>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-12">
          <ContentRenderer
            :value="doc"
            class="prose prose-indigo dark:prose-invert prose-lg max-w-none prose-headings:font-poppins prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300"
          />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();

const route = useRoute();
const { data: doc } = await useAsyncData(`article-${route.path}`, () => {
  return queryContent(route.path).findOne();
});

if (doc.value) {
  const imageUrl =
    doc.value.image ||
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000";
  const description =
    doc.value.description ||
    `Read my detailed write-up on the ${doc.value.title} challenge.`;

  useSeoMeta({
    title: `${doc.value.title} - CTF Write-up`,
    ogTitle: `${doc.value.title} - CTF Write-up`,
    ogType: "article",
    description,
    ogDescription: description,
    ogImage: imageUrl,
    ogUrl: `${useRequestURL().origin}${route.path}`,
    twitterCard: "summary_large_image",
    twitterImage: imageUrl,
    twitterTitle: `${doc.value.title} - CTF Write-up`,
    twitterDescription: description,
    author: "Nocteln",
  });
}
</script>

<style>
.prose :not(pre) > code {
  background-color: #f3f4f6;
  color: #4f46e5;
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
html.dark .prose :not(pre) > code {
  background-color: rgba(0, 0, 0, 0.4) !important;
  color: #a5b4fc !important;
}
.prose code::before,
.prose code::after {
  content: none !important;
}
</style>
