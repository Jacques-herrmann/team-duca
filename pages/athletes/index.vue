<template>
  <main class="athletes-page">
    <div class="athletes-page__hero">
      <span class="section__label">{{ $t('athletes.label') }}</span>
      <h1 class="athletes-page__title">{{ $t('athletes.title') }}</h1>
      <p class="athletes-page__subtitle">{{ $t('athletes.pageSubtitle') }}</p>
    </div>
    <BlocksAthletes />
    <BlocksJoinUs />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Nos athlètes MMA Marseille — Science DUCA',
  meta: [
    {
      name: 'description',
      content: 'Découvrez les athlètes de Science DUCA — combattants MMA professionnels et amateurs formés à Marseille. Palmarès, records et disciplines.',
    },
    { property: 'og:title', content: 'Nos athlètes MMA Marseille — Science DUCA' },
    {
      property: 'og:description',
      content: 'Les athlètes de Science DUCA — MMA, BJJ, de l\'amateur au professionnel. Marseille.',
    },
  ],
})
</script>

<style scoped lang="sass">
.athletes-page
  min-height: 100vh

// ─── Hero ────────────────────────────────────────────────────
.athletes-page__hero
  padding: $spacing-xl $spacing-md
  border-bottom: 1px solid rgba($white, 0.06)
  display: flex
  flex-direction: column
  gap: $spacing-md

  @include lg
    padding: $spacing-xxl 90px

.athletes-page__title
  @include title(clamp(4rem, 12vw, 14rem))
  color: $white
  margin: 0
  line-height: 0.88

.athletes-page__subtitle
  @include sub(1rem)
  color: rgba($white, 0.5)
  margin: 0
</style>
