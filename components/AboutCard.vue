<template>
  <div
    class="flex flex-col items-center shadow-xl border-2 rounded-md p-6 w-[25vw]"
  >
    <div
      class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-blue-500 shadow-blue-500/40"
    >
      <Icon :name="icon" class="h-7 w-7 text-white" />
    </div>
    <h1
      class="text-darken mb-3 pt-3 text-3xl font-medium lg:h-14 lg:px-14 -translate-y-8"
    >
      {{ title }}
    </h1>
    <p class="px-4 text-gray-500 -translate-y-4">
      {{ content }}
    </p>
  </div>
</template>

<script setup>
const {} = defineProps(["title", "content", "icon"]);
</script>
