<script setup lang="ts">
defineProps<{
  amount: string | number
  unit?: string
  size?: 'md' | 'lg'
}>()
</script>

<template>
  <div class="price">
    <span class="price__amount" :class="{ 'price__amount--lg': size === 'lg' }">{{ amount }}€</span>
    <span v-if="unit" class="price__unit">{{ unit }}</span>
  </div>
</template>

<style scoped lang="sass">
.price
  display: flex
  align-items: baseline
  gap: 0.3rem

.price__amount
  @include title(clamp(2rem, 3vw, 3.5rem))
  color: $white

  &--lg
    font-size: clamp(2.5rem, 4vw, 4.5rem)

.price__unit
  @include caption(0.8rem)
  color: rgba($white, 0.6)
</style>
