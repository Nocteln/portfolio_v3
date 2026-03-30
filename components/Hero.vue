<template>
  <section
    class="flex flex-col md:flex-row items-center justify-center text-center pt-32"
    id="accueil"
  >
    <NuxtImg
      src="/avatar_coucou.png"
      alt="avatar"
      format="webp"
      loading="lazy"
      class="rounded-xl w-48 md:w-60"
    />
    <div class="md:ml-8 mt-4 md:mt-0">
      <h1 class="text-4xl font-bold font-poppins italic">
        👋
        <span
          class="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent pr-10"
          >Hello World! I'm {{ currentWord }}</span
        >
      </h1>

      <div class="font-roboto text-gray-700 leading-relaxed mt-4 text-lg px-6">
        <p>🎓 Étudiant en 2ème année à Epita Paris!</p>
      </div>
      <div class="flex justify-center space-x-4 mt-6">
        <button class="mt-6 px-6">
          <a
            href="#projets"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >Découvrez mes projets 🚀</a
          >
        </button>
        <button class="mt-6 px-6">
          <a
            href="/writeups"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >Découvrez mes write-ups 📝</a
          >
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
const words = ["a developer", "a student", "a gamer", "Eliott", "a dreamer"];

const currentWord = ref(""); // Mot affiché à l'écran
let wordIndex = 0; // Index du mot actuel
let charIndex = 0; // Index du caractère à afficher/supprimer
let isDeleting = false; // Indicateur si on est en mode suppression
let typingSpeed = 150; // Vitesse de frappe
let deletingSpeed = 50; // Vitesse de suppression
let pauseBeforeDeleting = 4000; // Pause avant de commencer la suppression

const typeEffect = () => {
  const current = words[wordIndex];

  // Cas où on supprime des caractères
  if (isDeleting) {
    currentWord.value = current.substring(0, charIndex);
    charIndex--;

    // Quand on a supprimé tout le mot
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Passe au mot suivant
      charIndex = 0; // Réinitialise l'indice de caractère
    }
  } else {
    // Cas où on ajoute des caractères
    currentWord.value = current.substring(0, charIndex);
    charIndex++;

    // Quand le mot est entièrement affiché
    if (charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
      }, pauseBeforeDeleting); // Pause avant suppression
    }
  }

  // Ajuster la vitesse selon qu'on supprime ou qu'on écrit
  setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
};

onMounted(() => {
  typeEffect();
});
</script>
