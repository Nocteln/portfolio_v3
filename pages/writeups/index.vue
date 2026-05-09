<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8 pt-28"
  >
    <div class="max-w-7xl mx-auto w-full">
      <div class="flex items-center justify-between mb-8">
        <h1
          class="text-4xl font-extrabold text-gray-900 tracking-tight poppins"
        >
          CTF Write-ups
        </h1>
        <NuxtLink
          to="/"
          class="text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap"
          >Back to Portfolio</NuxtLink
        >
      </div>

      <!-- Barre de recherche et de filtres -->
      <div
        class="bg-white rounded-2xl shadow-sm p-5 mb-8 flex flex-col md:flex-row gap-4 items-center"
      >
        <!-- Champ de recherche par nom/titre -->
        <div
          class="flex-1 w-full flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow"
        >
          <Icon
            name="i-iconamoon-search-light"
            class="text-gray-400 text-xl mr-3"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for a write-up or CTF..."
            class="w-full bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400"
          />
        </div>

        <!-- Sélecteur de plateforme -->
        <div class="w-full md:w-64">
          <select
            v-model="selectedPlatform"
            class="w-full bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
          >
            <option value="">All platforms</option>
            <option
              v-for="plat in availablePlatforms"
              :key="plat"
              :value="plat"
            >
              {{ plat }}
            </option>
          </select>
        </div>
      </div>

      <!-- Grille d'articles filtrée -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        v-if="filteredWriteups.length > 0"
      >
        <NuxtLink
          v-for="article in filteredWriteups"
          :key="article._path"
          :to="article._path"
          class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-[300px]"
        >
          <!-- Background Image -->
          <NuxtImg
            :src="
              article.image ||
              'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
            "
            alt="Card background"
            format="webp"
            loading="lazy"
            sizes="100vw md:33vw"
            width="400"
            height="300"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"
          ></div>

          <!-- Content -->
          <div class="relative p-6 h-full flex flex-col justify-end">
            <div class="flex justify-between items-center mb-2">
              <div class="flex flex-wrap gap-1.5 items-center">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-indigo-500 text-white shadow"
                >
                  {{ article.platform || "CTF" }}
                </span>
                <span
                  v-if="article.difficulty"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-rose-500 text-white shadow"
                >
                  {{ article.difficulty }}
                </span>
              </div>
              <span
                class="text-xs text-gray-300 font-medium min-w-max ml-2 shrink-0"
              >
                {{
                  article.date
                    ? new Date(article.date).toLocaleDateString("en-US")
                    : "Unknown date"
                }}
              </span>
            </div>

            <h3
              class="text-xl md:text-2xl font-bold text-white mb-1 shadow-sm leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2"
            >
              {{ article.title }}
            </h3>

            <p class="text-sm text-gray-200 mt-1 font-medium italic truncate">
              {{ article.ctf || "" }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <Icon
          name="i-iconamoon-ghost-light"
          class="text-6xl text-gray-300 mx-auto mb-4"
        />
        <h3 class="text-xl font-bold text-gray-800">No write-ups found</h3>
        <p class="text-gray-500 mt-2">Try modifying your search or filters.</p>
        <button
          @click="
            searchQuery = '';
            selectedPlatform = '';
          "
          class="mt-4 px-6 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { data: writeups } = await useAsyncData("writeups", () => {
  return queryContent("writeups").sort({ date: -1 }).find();
});

const searchQuery = ref("");
const selectedPlatform = ref("");

// Automatic retrieval of unique platforms for the dropdown menu
const availablePlatforms = computed(() => {
  if (!writeups.value) return [];
  const platforms = writeups.value.map((w) => w.platform || "Autre");
  return [...new Set(platforms)].sort();
});

// Reactive filtering
const filteredWriteups = computed(() => {
  if (!writeups.value) return [];

  return writeups.value.filter((article) => {
    // Text filtering (if matches title or CTF name)
    const query = searchQuery.value.toLowerCase();
    const matchesSearch =
      !query ||
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.ctf && article.ctf.toLowerCase().includes(query));

    // Filtering by platform
    const platform = article.platform || "Autre";
    const matchesPlatform =
      selectedPlatform.value === "" || platform === selectedPlatform.value;

    return matchesSearch && matchesPlatform;
  });
});

useSeoMeta({
  title: "CTF Write-ups - Nocteln",
  description:
    "List of my Capture The Flag (CTF) write-ups by Nocteln (Eliott Mieze).",
});
</script>
