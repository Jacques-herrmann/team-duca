<template>
  <div class="app-image" :class="{ 'app-image--placeholder': !imageExists }">
    <img
      v-if="imageExists"
      :src="src"
      :alt="alt"
      v-bind="$attrs"
    />
    <div v-else class="app-image__placeholder">
      <svg class="app-image__placeholder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
        <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="app-image__placeholder-text">{{ alt }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  src: string
  alt: string
}>()

defineOptions({ inheritAttrs: false })

// On essaie de détecter si l'image existe. En SSR/static, on suppose qu'elle n'existe pas
// tant qu'elle n'est pas dans /public. Le placeholder s'affiche automatiquement.
const imageExists = ref(false)

onMounted(() => {
  const img = new Image()
  img.onload = () => { imageExists.value = true }
  img.onerror = () => { imageExists.value = false }
  img.src = props.src
})
</script>
<style scoped lang="sass">
.app-image
  position: relative
  width: 100%
  height: 100%

  & img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center

  &__placeholder
    width: 100%
    height: 100%
    min-height: 200px
    background: rgba($white, 0.04)
    border: 1px dashed rgba($white, 0.15)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 1rem
    padding: 2rem
    text-align: center

  &__placeholder-icon
    width: 40px
    height: 40px
    color: rgba($white, 0.2)
    flex-shrink: 0

  &__placeholder-text
    @include text(0.75rem)
    color: rgba($white, 0.3)
    max-width: 280px
    line-height: 1.5
</style>
