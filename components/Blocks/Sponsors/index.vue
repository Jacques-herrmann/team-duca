<template>
  <section class="sponsors">
    <GraphicDivider ornament="diamond" color="white" class="sponsors__divider"/>
    <span class="section__label sponsors__label">{{ $t('sponsors.label') }}</span>
    <div class="sponsors__logos">
      <a
          v-for="sponsor in sponsors"
          :key="sponsor.id"
          :href="sponsor.url || '#'"
          class="sponsors__logo-wrap"
          :aria-label="sponsor.name"
          target="_blank"
          rel="noopener noreferrer"
      >
        <img :src="sponsor.logo" :alt="sponsor.logoAlt" class="sponsors__logo"/>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import {sponsors} from '~/data/sponsors'
</script>

<style scoped lang="sass">
.sponsors
  background-color: $black-mid
  border-top: 1px solid rgba($white, 0.06)
  padding: $spacing-lg $spacing-md

  @include lg
    padding: $spacing-xl 90px

.sponsors__divider
  margin-bottom: $spacing-lg

.sponsors__label
  display: block
  text-align: center
  margin-bottom: $spacing-md

.sponsors__logos
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  gap: $spacing-lg

.sponsors__logo-wrap
  display: flex
  align-items: center
  justify-content: center
  opacity: 0.45
  transition: opacity 0.2s ease, filter 0.2s ease

  &:hover
    opacity: 1

.sponsors__logo
  max-height: 60px
  max-width: 180px
  width: auto
  object-fit: contain
</style>
