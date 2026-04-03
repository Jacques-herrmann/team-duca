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

<script setup>
const { t } = useI18n()

useHead({
  title: computed(() => t('meta.athletes.title')),
  meta: [
    { name: 'description',        content: computed(() => t('meta.athletes.description')) },
    { property: 'og:title',       content: computed(() => t('meta.athletes.ogTitle')) },
    { property: 'og:description', content: computed(() => t('meta.athletes.ogDescription')) },
  ],
})
</script>

<style scoped lang="sass">
.athletes-page
  min-height: 100vh

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
