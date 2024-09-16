<template>
  <section class="pt-20 flex flex-col items-center">
    <h2 class="pb-6 text-3xl font-bold text-gray-800">Me contacter</h2>
    <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10"></span>

    <form
      class="w-[70vw] md:w-[60vw] bg-white shadow-lg rounded-lg p-8 space-y-6"
      @submit="handleSubmit"
    >
      <!-- Nom -->
      <div class="flex flex-col md:flex-row gap-10 items-center justify-center">
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="name"
            >Nom</label
          >
          <input
            type="text"
            id="name"
            name="name"
            v-model="formData.name"
            placeholder="Votre nom"
            class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-bold mb-2" for="email"
            >Email</label
          >
          <input
            type="email"
            id="email"
            name="email"
            v-model="formData.email"
            placeholder="Votre email"
            class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2" for="sujet"
            >Sujet</label
          >
          <input
            type="text"
            id="sujet"
            name="sujet"
            v-model="formData.sujet"
            placeholder="Le sujet de votre demande"
            class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="message"
          >Message</label
        >
        <textarea
          id="message"
          name="message"
          rows="5"
          v-model="formData.message"
          placeholder="Votre message"
          class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        ></textarea>
      </div>

      <!-- Bouton de Soumission -->
      <div class="text-center">
        <button
          type="submit"
          class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Envoyer le message
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
const formData = reactive({
  name: "",
  email: "",
  sujet: "",
  message: "",
});

function handleSubmit(e) {
  e.preventDefault();
  console.log(formData.name);
}
</script>
