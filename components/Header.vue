<template>
  <header
    class="bg-white/80 backdrop-blur-md top-0 sticky w-full z-50 shadow-xl px-10 py-2 flex justify-between items-center"
  >
    <div class="leading-3">
      <h1 class="text-3xl font-extrabold tracking-wide text-gray-800">
        Eliott Mieze
      </h1>

      <p class="text-sm">Etudiant à Epita!</p>
    </div>
    <div class="flex justify-evenly w-[40vw] space-x-12">
      <a href="#" class="hover:text-blue-600 transition duration-300">Home</a>
      <a
        href="#about"
        class="hover:text-blue-600 transition duration-300 border-b-2 border-blue-600"
        >About</a
      >
      <a href="#projets" class="hover:text-blue-600 transition duration-300"
        >Projets</a
      >
      <a href="#contact" class="hover:text-blue-600 transition duration-300"
        >Contact</a
      >
    </div>
    <div class="flex space-x-4">
      <a
        href="https://github.com/Nocteln"
        class="text-gray-600 hover:text-black transition duration-300"
        ><Icon name="uil:github" class="text-3xl"
      /></a>
      <a
        href="https://www.linkedin.com/in/eliott-mieze-b15114232/"
        class="text-gray-600 hover:text-blue-600 transition duration-300"
        ><Icon name="uil:linkedin" class="text-3xl"
      /></a>
      <a
        href="https://discordapp.com/users/562693590514532362"
        class="text-gray-600 hover:text-blue-700 transition duration-300"
        ><Icon name="i-ic-baseline-discord" class="text-3xl"
      /></a>
    </div>
  </header>
</template>

<script default>
//TODO: Faire que le selecteur de la navbar soit dynamique (border-b-2 border-blue-600)
</script>
