<script setup>
const props = defineProps({
  variant:  { type: String, default: 'primary' },
  size:     { type: String, default: 'md' },
  to:       { type: String, default: null },
  href:     { type: String, default: null },
  type:     { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})

const variantClass = computed(() => `btn-${props.variant}`)
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
