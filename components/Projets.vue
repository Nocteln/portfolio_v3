<script setup lang="ts">
import projets from "~/public/data/projets";

const selectedProjet = ref<(typeof projets)[number] | null>(null);

const openModal = (projet: (typeof projets)[number]) => {
  selectedProjet.value = projet;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedProjet.value = null;
  document.body.style.overflow = "";
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section class="py-20 items-center flex flex-col" id="projets">
    <h1 class="pb-10 text-4xl font-bold font-poppins text-gray-800">
      Mes projets
    </h1>
    <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10" />
    <div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 max-w-6xl mx-auto">
        <div
          v-for="projet in projets"
          :key="projet.id"
          class="group bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
          @click="openModal(projet)"
        >
          <NuxtImg
            :src="projet.image"
            :alt="projet.title"
            format="webp"
            loading="lazy"
            sizes="100vw sm:50vw md:400px"
            width="400"
            height="192"
            class="w-full h-48 object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
          <div class="p-6">
            <h2 class="font-bold text-xl text-gray-800">{{ projet.title }}</h2>
            <p class="text-gray-600 text-sm mt-2">{{ projet.description }}</p>
            <button
              class="block w-full text-center bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-800 transition duration-300 ease-in-out"
            >
              Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedProjet"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          @click.self="closeModal"
        >
          <div
            class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div class="relative">
              <NuxtImg
                :src="selectedProjet.image"
                :alt="selectedProjet.title"
                format="webp"
                sizes="100vw sm:672px"
                width="672"
                height="256"
                class="w-full h-56 object-cover rounded-t-lg"
              />
              <button
                class="absolute top-3 right-3 bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition"
                aria-label="Fermer"
                @click="closeModal"
              >
                ✕
              </button>
            </div>

            <div class="p-6">
              <h2 class="font-bold text-2xl text-gray-800 font-poppins">
                {{ selectedProjet.title }}
              </h2>
              <p class="text-gray-600 mt-3">
                {{ selectedProjet.longDescription || selectedProjet.description }}
              </p>

              <div v-if="selectedProjet.stack?.length" class="mt-5">
                <h3 class="font-semibold text-gray-800">Stack technique</h3>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="tech in selectedProjet.stack"
                    :key="tech"
                    class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div v-if="selectedProjet.features?.length" class="mt-5">
                <h3 class="font-semibold text-gray-800">Features clés</h3>
                <ul class="mt-2 space-y-1">
                  <li
                    v-for="feature in selectedProjet.features"
                    :key="feature"
                    class="text-gray-600 text-sm flex items-start"
                  >
                    <span class="text-blue-500 mr-2">✓</span>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  v-if="selectedProjet.link"
                  :href="selectedProjet.link"
                  target="_blank"
                  class="flex-1 text-center bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-800 transition duration-300 ease-in-out"
                  >Voir le projet</a
                >
                <a
                  v-if="selectedProjet.link2"
                  :href="selectedProjet.link2"
                  target="_blank"
                  class="flex-1 text-center text-blue-500 border border-blue-500 hover:text-white hover:bg-slate-700 hover:border-slate-700 rounded px-4 py-2 transition duration-300 ease-in-out"
                  >Code source</a
                >
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
