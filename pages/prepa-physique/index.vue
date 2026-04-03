<template>
  <main class="prepa-page">
    <BlocksPrepaPhysiqueHero />
    <BlocksPrepaPhysiqueMethod />
    <BlocksPrepaPhysique id="programmes" />
    <BlocksPrepaPhysiqueFaq />
    <BlocksPrepaPhysiqueCta />
  </main>
</template>

<script setup>
const { t } = useI18n()

useHead({
  title: computed(() => t('meta.prepa.title')),
  meta: [
    { name: 'description',       content: computed(() => t('meta.prepa.description')) },
    { property: 'og:title',      content: computed(() => t('meta.prepa.ogTitle')) },
    { property: 'og:description', content: computed(() => t('meta.prepa.ogDescription')) },
  ],
})
</script>

<style scoped lang="sass">
.prepa-page
  min-height: 100vh
</style>
