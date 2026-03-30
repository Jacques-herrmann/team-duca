<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'outline' | 'ghost-red' | 'inverse'
  size?: 'md' | 'lg'
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()

const variantClass = computed(() => `btn-${props.variant ?? 'primary'}`)
const sizeClass = computed(() => props.size === 'lg' ? 'btn--lg' : '')
const disabledClass = computed(() => props.disabled ? 'btn--disabled' : '')

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="!to && !href ? (type ?? 'button') : undefined"
    :disabled="!to && !href ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :class="[variantClass, sizeClass, disabledClass]"
  >
    <slot />
  </component>
</template>

<style scoped lang="sass">
.btn--disabled
  opacity: 0.4
  pointer-events: none
  cursor: not-allowed
</style>
