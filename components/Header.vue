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
    <div class="px-10 py-4 flex justify-between items-center lg:fixed">
      <div class="leading-3 lg:hidden">
        <h1 class="text-3xl font-extrabold tracking-wide text-gray-800">
          Eliott Mieze
        </h1>
        <p class="text-sm">Etudiant à Epita!</p>
      </div>
      <div
        @click="toggleMenu"
        class="lg:hidden cursor-pointer bg-blue-600 text-white w-8 h-8 rounded flex justify-center items-center"
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
      class="px-10 py-2 flex transition-all duration-300 ease-in-out items-center justify-between flex-col lg:flex-row"
      :class="[
        isOpen
          ? 'max-h-screen opacity-100 visible'
          : 'max-h-0 opacity-0 invisible',
        'lg:max-h-none lg:opacity-100 lg:visible',
      ]"
    >
      <div class="leading-3 hidden lg:block">
        <h1 class="text-3xl font-extrabold tracking-wide text-gray-800">
          Eliott Mieze
        </h1>
        <p class="text-sm">Etudiant à Epita!</p>
      </div>
      <div
        class="text-center flex lg:justify-center lg:space-x-8 text-lg lg:text-base items-center justify-center py-4 gap-4 flex-col lg:flex-row"
      >
        <a
          href="/#accueil"
          class="hover:text-blue-600 transition duration-300 relative py-1"
          :class="{ 'text-blue-600 font-semibold border-b-2 border-blue-600': isActive('accueil') && $route.path === '/' }"
          >Accueil</a
        >
        <a
          href="/#about"
          class="hover:text-blue-600 transition duration-300 relative py-1"
          :class="{ 'text-blue-600 font-semibold border-b-2 border-blue-600': isActive('about') && $route.path === '/' }"
          >A propos</a
        >
        <a
          href="/#skills"
          class="hover:text-blue-600 transition duration-300 relative py-1"
          :class="{ 'text-blue-600 font-semibold border-b-2 border-blue-600': isActive('skills') && $route.path === '/' }"
          >Mes compétences</a
        >
        <a
          href="/#projets"
          class="hover:text-blue-600 transition duration-300 relative py-1"
          :class="{ 'text-blue-600 font-semibold border-b-2 border-blue-600': isActive('projets') && $route.path === '/' }"
          >Projets</a
        >
        <NuxtLink
          to="/writeups"
          class="hover:text-blue-600 transition duration-300 relative py-1"
          :class="{ 'text-blue-600 font-semibold border-b-2 border-blue-600': isActive('latest-writeups') || $route.path.startsWith('/writeups') }"
          >Write-ups</NuxtLink
        >
      </div>
      <div class="flex space-x-4 pb-4 lg:pb-0">
        <a
          href="https://github.com/Nocteln"
          class="text-gray-600 hover:text-black transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mon compte GitHub"
        >
          <Icon name="uil:github" class="text-3xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/eliott-mieze-b15114232/"
          class="text-gray-600 hover:text-blue-600 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mon profil LinkedIn"
        >
          <Icon name="uil:linkedin" class="text-3xl" />
        </a>
        <a
          href="https://discordapp.com/users/562693590514532362"
          class="text-gray-600 hover:text-blue-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Me contacter sur Discord"
        >
          <Icon name="i-ic-baseline-discord" class="text-3xl" />
        </a>
        <a
          href="https://tryhackme.com/p/nocteln"
          class="transition duration-300 flex items-center justify-center opacity-70 hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
          title="TryHackMe"
          aria-label="Mon profil TryHackMe"
        >
          <img src="/tryhackme.svg" alt="TryHackMe" width="28" height="28" class="w-[28px] h-[28px]" />
        </a>
      </div>
    </nav>
  </header>
</template>
