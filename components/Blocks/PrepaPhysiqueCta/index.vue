<template>
  <div class="prepa-cta">
    <h2 class="prepa-cta__title">{{ $t('prepa.cta.title') }}</h2>
    <nuxt-link :to="localePath('/inscription?service=prepa')" class="btn-inverse btn--lg">
      {{ $t('prepa.cta.button') }}
    </nuxt-link>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.prepa-cta
  background-color: $red
  padding: $spacing-xl $spacing-md
  display: flex
  flex-direction: column
  align-items: center
  gap: $spacing-lg
  text-align: center

  @include lg
    flex-direction: row
    justify-content: space-between
    text-align: left
    padding: $spacing-xxl 90px

.prepa-cta__title
  @include title(clamp(3rem, 7vw, 7rem))
  color: $white
  line-height: 0.9
  margin: 0
</style>
