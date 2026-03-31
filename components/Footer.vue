<template>
  <footer
    class="bg-gradient-to-b from-blue-100 to-blue-200 py-12 mt-20 w-full text-center rounded-t-[50px] md:rounded-t-[100px]"
  >
    <div class="mx-auto flex flex-col items-center gap-10">
      <div class="flex flex-col items-center w-[80vw]">
        <h2 class="text-2xl font-bold mb-4">Une question? Contactez moi!</h2>
        <p class="text-gray-700 mb-4">
          Par mail ou via les réseaux sociaux, je serai ravi de répondre à vos
          questions!
        </p>
      </div>

      <div class="flex justify-evenly">
        <div class="flex flex-col items-start">
          <div class="flex space-x-6">
            <a
              :href="mailtoLink"
              class="text-gray-400 hover:text-black transition"
              aria-label="Envoyer un email"
            >
              <Icon name="i-ic-round-email" class="text-2xl" />
            </a>
            <a
              href="https://github.com/nocteln"
              class="text-gray-400 hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon compte GitHub"
            >
              <Icon name="i-uiw-github" class="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/eliott-mieze-b15114232/"
              class="text-gray-400 hover:text-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon profil LinkedIn"
            >
              <Icon name="i-uiw-linkedin" class="text-2xl" />
            </a>
            <a
              href="https://discordapp.com/users/562693590514532362"
              class="text-gray-400 hover:text-blue-600 transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rejoindre mon serveur Discord"
            >
              <Icon name="i-akar-icons-discord-fill" class="text-2xl" />
            </a>
            <a
              href="https://tryhackme.com/p/nocteln"
              class="transition duration-300 flex items-center justify-center opacity-40 hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
              title="TryHackMe"
              aria-label="Mon profil TryHackMe"
            >
              <img src="/tryhackme.svg" alt="TryHackMe" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div class="h-[1.5px] bg-slate-500/50 w-[30vw] rounded" />
      <div class="mt-4 text-center text-gray-700 text-sm w-[80vw]">
        <p>
          &copy; 2024 Eliott Mieze. Tous droits réservés. - Développé avec
          <span @click="fiesta" class="cursor">❤️</span> en NuxtJs
        </p>
      </div>
    </div>

    <!-- Conteneur des emojis -->
    <div
      class="emoji-container"
      v-for="(emoji, index) in emojis"
      :key="index"
      :style="emoji.style"
    >
      {{ emoji.char }}
    </div>
  </footer>
</template>
<script setup>
const emojis = ref([]);

// Obfuscation de l'email
const m1 = "eliottmieze";
const m2 = "gmail.com";
const mailtoLink = computed(() => `mai` + `lto:${m1}@${m2}`);

const emojiList = [
  "😀", "😍", "🥳", "🌟", "🎉", "🦄", "🌈", "🍕", 
  "🚀", "💖", "✨", "👌", "😎", "🤩", "😑", "🫡", 
  "😶‍🌫️", "🤖", "🎈", "🎀", "👓", "🧦", "👟", "💎", 
  "🎣", "⛳", "🥌", "⛸️", "🎲", "🎰", "🪬", "♟️", 
  "🔔", "🎷", "🔑", "⚗️", "📱", "💻",
];

let fiestaRunning = false;

function fiesta() {
  if (fiestaRunning) return;
  fiestaRunning = true;
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.textContent =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      emoji.style.position = "fixed";
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.top = "-20px";
      emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
      emoji.style.pointerEvents = "none";
      emoji.style.zIndex = "9999";
      emoji.classList.add("emoji-animation");
      document.body.appendChild(emoji);

      anime({
        targets: emoji,
        translateY: window.innerHeight + 20,
        opacity: [1, 0],
        duration: 5000,
        easing: "easeInQuad",
        complete: () => {
          if (document.body.contains(emoji)) {
            document.body.removeChild(emoji);
          }
        },
      });
    }, i * 100);
  }
  
  // Limite les clics à 1 fois toutes les 2.5 secondes
  setTimeout(() => {
    fiestaRunning = false;
  }, 2500);
}

// Cleanup function to remove any remaining emojis when component is unmounted
function cleanup() {
  document.querySelectorAll(".emoji-animation").forEach((el) => el.remove());
}

onMounted(() => {
  // Add anime.js script to the document
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
  script.async = true;
  document.head.appendChild(script);
});

onUnmounted(cleanup);
</script>

<style scoped>
.heart {
  transition: transform 0.1s;
}
.heart-button:active .heart {
  transform: scale(1.2);
}
</style>
