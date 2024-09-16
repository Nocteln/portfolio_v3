<template>
  <div class="py-10 text-center">
    <h1 class="py-5 text-3xl font-bold font-poppins text-gray-800">
      Mes compétences
    </h1>
    <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10" />
    <div class="pt-10 flex gap-10 flex-wrap items-center justify-center">
      <div v-for="skill in skills" :key="skill.id">
        <div
          class="relative group w-14 h-14 rounded-full shadow-lg bg-blue-500 shadow-blue-500/40 text-center flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
        >
          <span
            class="group-hover:opacity-100 transition-opacity bg-blue-500 shadow-blue-500/40 shadow-lg px-1 text-sm text-gray-100 rounded-md absolute -top-16 left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto"
            >{{ skill.name }}</span
          >
          <Icon
            :name="skill.icon"
            class="grayscale group-hover:grayscale-0 text-2xl transition duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import skills from "~/public/data/skills";

/*

function getPosition(index) {
  const angle = (index / skills.length) * 360;
  const radius = 100; // Distance par rapport au centre
  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);
  return `transform: translate(${x}px, ${y}px)`;
}

<!-- <div class="pt-32 relative">
      <div v-for="skill in skills" :key="skill.id">
        <div
          class="absolute group w-12 h-12 rounded-full shadow-lg bg-blue-500 shadow-blue-500/40 text-center flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
          :style="getPosition(skill.id)"
        >
          <Icon
            :name="skill.icon"
            class="grayscale group-hover:grayscale-0 text-2xl transition duration-300"
          />
        </div>
      </div>
    </div> -->*/
</script>
