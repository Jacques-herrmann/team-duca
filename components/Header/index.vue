<template>
  <header class="header">
    <nuxt-link :to="localePath('/')" class="header__logo">
      <span>SCIENCE</span>
      <span>DUCA</span>
    </nuxt-link>

    <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
      <nuxt-link
        v-for="item in regularItems"
        :key="item.path"
        class="header__nav-link"
        :to="localePath(item.path)"
        @click="menuOpen = false"
      >
        {{ $t(item.labelKey) }}
      </nuxt-link>
      <LanguageSwitcher class="header__lang-mobile" />
    </nav>

    <div class="header__right">
      <LanguageSwitcher class="header__lang-desktop" />
      <nuxt-link
        v-if="ctaItem"
        :to="localePath(ctaItem.path)"
        class="header__cta"
      >
        {{ $t(ctaItem.labelKey) }}
      </nuxt-link>
      <button
        class="header__burger"
        :class="{ 'header__burger--open': menuOpen }"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="menuOpen = !menuOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <div
      v-if="menuOpen"
      class="header__overlay"
      @click="menuOpen = false"
    />
  </header>
</template>

<script setup lang="ts">
import { navItems } from '~/data/navigation'

const localePath = useLocalePath()
const menuOpen = ref(false)

const regularItems = computed(() => navItems.filter(i => !i.highlight))
const ctaItem = computed(() => navItems.find(i => i.highlight))
</script>

<style scoped lang="sass">
.header
  position: fixed
  top: 0
  left: 0
  right: 0
  height: $header-height
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 $spacing-md
  background-color: $black
  border-bottom: 1px solid rgba($white, 0.08)
  z-index: $z-header

  @include lg
    padding: 0 90px

// ─── Logo ────────────────────────────────────────────────────
.header__logo
  display: flex
  flex-direction: column
  line-height: 0.85
  text-decoration: none
  gap: 0

  span
    @include title(1.4rem)
    color: $white
    display: block

// ─── Nav ─────────────────────────────────────────────────────
.header__nav
  display: none
  gap: $spacing-md

  @include lg
    display: flex
    align-items: center

  &--open
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    position: fixed
    inset: 0
    background-color: $black
    z-index: $z-header - 1
    gap: $spacing-lg

.header__nav-link
  @include caption(0.75rem)
  color: rgba($white, 0.55)
  text-decoration: none
  transition: color 0.2s ease
  letter-spacing: 0.12em

  &:hover,
  &.router-link-active
    color: $white

  .header__nav--open &
    @include caption(1.6rem)
    color: $white
    letter-spacing: 0.15em

// ─── Right block ─────────────────────────────────────────────
.header__right
  display: flex
  align-items: center
  gap: $spacing-sm

.header__lang-desktop
  display: none
  @include lg
    display: flex

.header__lang-mobile
  display: flex
  margin-top: $spacing-md
  @include lg
    display: none

// ─── CTA ─────────────────────────────────────────────────────
.header__cta
  @include stamp(0.65rem)
  display: none
  padding: 0.45rem 1.1rem
  background-color: $red
  color: $white
  text-decoration: none
  transition: background-color 0.2s ease

  &:hover
    background-color: darken($red, 8%)

  @include lg
    display: block

// ─── Burger ──────────────────────────────────────────────────
.header__burger
  display: flex
  flex-direction: column
  justify-content: center
  gap: 5px
  width: 26px
  height: 26px
  background: none
  border: none
  cursor: pointer
  padding: 0
  position: relative
  z-index: $z-header + 1

  @include lg
    display: none

  span
    display: block
    width: 100%
    height: 1.5px
    background-color: $white
    transition: transform 0.3s ease, opacity 0.3s ease
    transform-origin: center

  &--open
    span:nth-child(1)
      transform: translateY(6.5px) rotate(45deg)
    span:nth-child(2)
      opacity: 0
    span:nth-child(3)
      transform: translateY(-6.5px) rotate(-45deg)

// ─── Overlay ─────────────────────────────────────────────────
.header__overlay
  position: fixed
  inset: 0
  z-index: $z-header - 2
</style>
