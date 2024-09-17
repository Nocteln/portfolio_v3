<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const activeSection = ref("accueil");

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Nettoyage de l'observer
  onUnmounted(() => {
    sections.forEach((section) => {
      observer.unobserve(section);
    });
  });
});

function isActive(section) {
  return activeSection.value === section;
}
</script>

<template>
  <header
    class="w-full fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-xl"
  >
    <div class="px-10 py-4 flex justify-between items-center md:fixed">
      <div class="leading-3 md:hidden">
        <h1 class="text-3xl font-extrabold tracking-wide text-gray-800">
          Eliott Mieze
        </h1>
        <p class="text-sm">Etudiant à Epita!</p>
      </div>
      <div
        @click="toggleMenu"
        class="md:hidden cursor-pointer bg-blue-600 text-white w-8 h-8 rounded flex justify-center items-center"
      >
        <Icon
          :name="
            !isOpen
              ? 'i-iconamoon-menu-burger-horizontal-bold'
              : 'i-fa6-solid-xmark'
          "
          class="text-2xl"
        />
      </div>
    </div>

    <nav
      class="px-10 py-2 flex transition-all duration-300 ease-in-out items-center justify-between flex-col md:flex-row"
      :class="[
        isOpen
          ? 'max-h-screen opacity-100 visible'
          : 'max-h-0 opacity-0 invisible',
        'md:max-h-none md:opacity-100 md:visible',
      ]"
    >
      <div class="leading-3 hidden md:block">
        <h1 class="text-3xl font-extrabold tracking-wide text-gray-800">
          Eliott Mieze
        </h1>
        <p class="text-sm">Etudiant à Epita!</p>
      </div>
      <div
        class="text-center flex md:justify-evenly md:w-[40vw] md:space-x-12 text-lg md:text-md items-center justify-center py-4 gap-4 flex-col md:flex-row"
      >
        <a
          href="#accueil"
          class="hover:text-blue-600 transition duration-300"
          :class="{ 'border-b-2 border-blue-600': isActive('accueil') }"
          >Accueil</a
        >
        <a
          href="#about"
          class="hover:text-blue-600 transition duration-300"
          :class="{ 'border-b-2 border-blue-600': isActive('about') }"
          >A propos</a
        >
        <a
          href="#skills"
          class="hover:text-blue-600 transition duration-300"
          :class="{ 'border-b-2 border-blue-600': isActive('skills') }"
          >Mes compétences</a
        >
        <a
          href="#projets"
          class="hover:text-blue-600 transition duration-300"
          :class="{ 'border-b-2 border-blue-600': isActive('projets') }"
          >Projets</a
        >
      </div>
      <div class="flex space-x-4">
        <a
          href="https://github.com/Nocteln"
          class="text-gray-600 hover:text-black transition duration-300"
          target="_blank"
        >
          <Icon name="uil:github" class="text-3xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/eliott-mieze-b15114232/"
          class="text-gray-600 hover:text-blue-600 transition duration-300"
          target="_blank"
        >
          <Icon name="uil:linkedin" class="text-3xl" />
        </a>
        <a
          href="https://discordapp.com/users/562693590514532362"
          class="text-gray-600 hover:text-blue-700 transition duration-300"
          target="_blank"
        >
          <Icon name="i-ic-baseline-discord" class="text-3xl" />
        </a>
      </div>
    </nav>
  </header>
  <!-- Ajoutez un élément pour compenser la hauteur du header fixe -->
  <!-- <div class="h-[calc(100px+4rem)] md:h-[calc(100px+2rem)]"></div> -->
</template>
