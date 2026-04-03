<template>
  <section class="joinus">
    <div class="joinus__inner">
      <h2 class="joinus__title">{{ $t('joinus.cta') }}</h2>
      <AppButton :to="localePath('/inscription')" variant="inverse" size="lg" class="joinus__btn">
        {{ $t('cta.join') }}
      </AppButton>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath()
</script>

<style scoped lang="sass">
.joinus
  background-color: $red
  @include section-pad

.joinus__inner
  display: flex
  flex-direction: column
  align-items: center
  gap: $spacing-lg
  text-align: center

  @include lg
    flex-direction: row
    justify-content: space-between
    text-align: left

.joinus__title
  @include title(clamp(3rem, 8vw, 6rem))
  color: $white
  -webkit-text-stroke: 1px rgba($black, 0.3)
  margin: 0
  max-width: 18ch
  line-height: 0.88

  @include lg
    font-size: clamp(4rem, 6vw, 8rem)

.joinus__btn
  white-space: nowrap
  flex-shrink: 0
</style>
