<script setup lang="ts">
defineProps<{
  active?: boolean
  tag?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="tag ?? 'button'"
    :class="['tag', { 'tag--active': active }]"
    :type="(tag ?? 'button') === 'button' ? 'button' : undefined"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<style scoped lang="sass">
.tag
  @include caption(0.75rem)
  padding: 0.5rem 1.25rem
  border: 1px solid rgba($white, 0.2)
  background: transparent
  color: rgba($white, 0.7)
  cursor: pointer
  transition: background-color $transition-fast, border-color $transition-fast, color $transition-fast
  white-space: nowrap

  &--active,
  &:hover
    background: $red
    border-color: $red
    color: $white
</style>
