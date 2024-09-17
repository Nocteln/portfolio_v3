<template>
  <section class="pt-20 items-center w-[80vw] flex flex-col" id="about">
    <h1 class="pb-10 text-4xl font-bold font-poppins text-gray-800">
      A propos de moi
    </h1>
    <span class="h-0.5 w-[20vw] bg-gray-700/10 mb-10" />
    <div class="flex flex-wrap gap-10">
      <AboutCard
        title="Curieux"
        content="Toujours prêt à apprendre de nouvelles technologies pour résoudre des
      problèmes et améliorer mes compétences."
        icon="i-lets-icons-lamp-fill"
      />
      <AboutCard
        title="Autonome"
        content="Capable de mener des projets de bout en bout, quelque soit la difficultée."
        icon="i-fluent-arrow-trending-sparkle-20-filled"
      />
      <AboutCard
        title="Polyvalent"
        content="Une forte capacité à apprendre et à s'adapter rapidement."
        icon="i-gravity-ui-route"
      />
    </div>

    <Skills />
  </section>
</template>
