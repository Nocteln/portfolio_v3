<template>
  <div class="pt-10">
    <div v-for="skill in skills" :key="skill.name">
      <div>
        <h1>{{ skill.name }}</h1>
        <Icon :name="skill.icon" class="grayscale hover:grayscale-0 text-2xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import skills from "~/public/data/skills";
//TODO: effet de paralax pour les icones
</script>
