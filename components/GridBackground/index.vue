<template>
  <div class="grid-background">
    <div class="grid-background__columns" v-for="c in columns" :key="c"/>
    <div class="grid-background__h"/>
    <div class="grid-background__f"/>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps({
  columns: {
    type: Number,
    default: 6
  },
  margin: {
    type: String,
    default: '90px'
  }
})
</script>

<style scoped lang="sass">

.grid-background
  position: absolute
  top: 0
  left: 0
  z-index: -1
  height: 100%
  width: 100%
  background-color: $black
  padding: 0 v-bind(margin)
  display: flex
  align-items: center
  justify-content: center

  &__columns
    height: 100%
    flex-grow: 1
    border-right: 1px solid rgba(249, 249, 249, 0.03)

    &:first-child
      border-left: 1px solid rgba(249, 249, 249, 0.03)


  &__h
    position: fixed
    top: 0
    left: 0
    height: 160px
    width: 100%
    z-index: 1
    background: linear-gradient(180deg, rgba(23, 23, 23, 1) 50%, rgba(0,0,0,0) 100%)

  &__f
    position: absolute
    bottom: 0
    left: 0
    height: 140px
    width: 100%
    z-index: 1
    background: linear-gradient(0deg, rgba(23, 23, 23, 1) 50%, rgba(0,0,0,0) 100%)

</style>
