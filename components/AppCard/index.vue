<script setup lang="ts">
defineProps<{
  highlighted?: boolean
  tag?: string
}>()
</script>

<template>
  <component
    :is="tag ?? 'div'"
    :class="['card', { 'card--highlighted': highlighted }]"
  >
    <slot />
  </component>
</template>

<style scoped lang="sass">
.card
  background-color: $black-light
  border: 1px solid transparent
  display: flex
  flex-direction: column
  transition: border-color $transition-fast

  &--highlighted
    border-color: $red

  &:hover
    border-color: rgba($white, 0.12)
</style>
