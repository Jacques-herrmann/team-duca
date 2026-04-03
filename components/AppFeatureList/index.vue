<script setup>
defineProps({
  features: { type: Array, required: true },
})
</script>

<template>
  <ul class="feature-list">
    <li v-for="(feature, i) in features" :key="i" class="feature-list__item">
      <span class="feature-list__check" aria-hidden="true">✓</span>
      <span>{{ feature }}</span>
    </li>
  </ul>
</template>

<style scoped lang="sass">
.feature-list
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 0.5rem

.feature-list__item
  display: flex
  align-items: flex-start
  gap: 0.6rem
  @include text(0.875rem)
  color: rgba($white, 0.65)

.feature-list__check
  color: $red
  font-weight: bold
  flex-shrink: 0
  margin-top: 0.15rem
  line-height: 1.4
</style>
