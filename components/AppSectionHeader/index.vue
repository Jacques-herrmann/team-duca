<script setup>
defineProps({
  label: { type: String, default: null },
  title: { type: String, required: true },
  align: { type: String, default: 'left' },
})
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
