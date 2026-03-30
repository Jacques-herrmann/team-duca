<script setup lang="ts">
defineProps<{
  label?: string
  title: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div class="section-header" :class="`section-header--${align ?? 'left'}`">
    <span v-if="label" class="section__label">{{ label }}</span>
    <h2 class="section__title">{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped lang="sass">
.section-header
  display: flex
  flex-direction: column

  &--center
    align-items: center
    text-align: center
</style>
