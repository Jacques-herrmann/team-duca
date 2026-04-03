<script setup>
defineProps({
  ornament: { type: String, default: 'diamond' },
  color:    { type: String, default: 'red' },
})
</script>

<template>
  <div class="divider" :class="`divider--${color ?? 'red'}`">
    <span class="divider__line" />
    <span class="divider__ornament" aria-hidden="true">
      <!-- diamond -->
      <svg v-if="!ornament || ornament === 'diamond'" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <rect x="5" y="0" width="7" height="7" transform="rotate(45 5 5)" />
      </svg>
      <!-- cross -->
      <svg v-else-if="ornament === 'cross'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <rect x="5" y="0" width="2" height="12" />
        <rect x="0" y="5" width="12" height="2" />
      </svg>
      <!-- duca wordmark -->
      <span v-else-if="ornament === 'duca'" class="divider__ornament-text">DUCA</span>
    </span>
    <span class="divider__line" />
  </div>
</template>

<style scoped lang="sass">
.divider
  display: flex
  align-items: center
  gap: 1rem
  width: 100%

  &--red
    color: $red

  &--gold
    color: $gold

  &--white
    color: rgba($white, 0.3)

.divider__line
  flex: 1
  height: 1px
  background: currentColor
  opacity: 0.3

.divider__ornament
  flex-shrink: 0
  display: flex
  align-items: center
  justify-content: center

.divider__ornament-text
  @include stamp(0.55rem)
  color: currentColor
</style>
