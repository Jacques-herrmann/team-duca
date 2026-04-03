<template>
  <main class="inscription-page">
    <div class="inscription-page__hero">
      <span class="section__label">{{ $t('inscription.label') }}</span>
      <h1 class="inscription-page__title">{{ $t('inscription.pageTitle') }}</h1>
    </div>
    <BlocksInscription />
  </main>
</template>

<script setup>
const { t } = useI18n()

useHead({
  title: computed(() => t('meta.inscription.title')),
})
</script>

<style scoped lang="sass">
.inscription-page
  min-height: 100vh
  padding-bottom: $spacing-xxl

.inscription-page__hero
  padding: $spacing-xl $spacing-md
  margin-bottom: $spacing-xl
  padding-bottom: $spacing-xl
  border-bottom: 1px solid rgba($white, 0.06)

  @include lg
    padding: $spacing-xxl 90px

.inscription-page__title
  @include title(clamp(4rem, 12vw, 12rem))
  color: $white
  margin: $spacing-sm 0 0
  line-height: 0.88

// BlocksInscription hérite du padding de la page
:deep(.step-bar),
:deep(.inscription-step)
  padding-left: $spacing-md
  padding-right: $spacing-md

  @include lg
    padding-left: 90px
    padding-right: 90px
</style>
