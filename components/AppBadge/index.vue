<script setup lang="ts">
defineProps<{
  variant?: 'red' | 'dark' | 'outline-red'
  size?: 'sm' | 'md'
}>()
</script>

<template>
  <span :class="['badge', `badge--${variant ?? 'red'}`, size === 'md' ? 'badge--md' : '']">
    <slot />
  </span>
</template>

<style scoped lang="sass">
.badge
  @include stamp(0.6rem)
  display: inline-block
  padding: 0.3rem 0.8rem

.badge--red
  background-color: $red
  color: $white

.badge--dark
  background-color: $black-light
  color: rgba($white, 0.7)
  border: 1px solid rgba($white, 0.12)

.badge--outline-red
  background-color: rgba($red, 0.15)
  border: 1px solid rgba($red, 0.3)
  color: $red

.badge--md
  padding: 0.4rem 1rem
  font-size: 0.75rem
</style>
