<template>
  <div class="flex items-center pt-20">
    <img
      src="/avatar_coucou.png"
      alt="avatar"
      class="rounded-xl w-48 md:w-60"
    />
    <div class="md:ml-8 mt-4 md:mt-0">
      <h1 class="text-4xl font-bold font-poppins italic text-shadow-md">
        👋
        <span
          class="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
          >Hello World! I'm Eliott</span
        >
      </h1>

      <div
        class="font-roboto text-gray-700 leading-relaxed mt-4 text-shadow text-lg px-6"
      >
        <p>🎓 Un étudiant en 1ère année à Epita Paris!</p>

        <p>
          💻 Mais surtout un développeur passionné 🔥 qui crée des sites web 🌐
          et des jeux 🎮!
        </p>
      </div>
      <button class="mt-6">
        <a
          href="#projets"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >Découvrez mes projets 🚀</a
        >
      </button>
    </div>
  </div>
</template>

<script setup>
//TODO: utiliser snap-y pour le scroll
//TODO: pour le titre 'helo world, ....' faire que le mot 'Eliott' soit interchangable (en mode: I'm a developer, I'm a student, I'm a gamer, etc)
</script>
