<template>
  <div class="app-layout">
    <Header />
    <div class="layout-main">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
.app-layout
  position: relative
  width: 100%
  min-height: 100vh
  background-color: $black
  color: $white

.layout-main
  padding-top: $header-height

// ─── Grain global ─────────────────────────────────────────────
.app-layout::after
  animation: grain 6s steps(10) infinite
  background-image: url('/assets/images/grain.png')
  background-repeat: repeat
  background-size: 200px 200px
  content: ''
  position: fixed
  top: -100%
  left: -100%
  height: 300%
  width: 300%
  opacity: 0.04
  pointer-events: none
  will-change: transform
  z-index: $z-noise

  @keyframes grain
    0%
      transform: translate(20%, -15%)
    10%
      transform: translate(-20%, -15%)
    20%
      transform: translate(20%, -5%)
    30%
      transform: translate(-20%, -5%)
    40%
      transform: translate(20%, 5%)
    50%
      transform: translate(-20%, 5%)
    60%
      transform: translate(20%, 15%)
    70%
      transform: translate(-20%, 15%)
    80%
      transform: translate(20%, 5%)
    90%
      transform: translate(-20%, 5%)
    100%
      transform: translate(20%, -5%)
</style>
