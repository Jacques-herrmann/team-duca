<template>
  <section class="section testimonials">
    <div class="testimonials__header">
      <AppSectionHeader :label="$t('testimonials.label')" :title="$t('testimonials.title')" />
      <div class="testimonials__filters">
        <button
          v-for="f in filters"
          :key="f.value"
          class="testimonials__filter"
          :class="{ 'testimonials__filter--active': activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
        </button>
      </div>
    </div>
    <div class="testimonials__grid">
      <div
        v-for="t in filtered"
        :key="t.id"
        class="testimonial-card"
      >
        <p class="testimonial-card__quote">{{ $t(t.quoteKey) }}</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">
            <AppImage :src="t.image" :alt="t.imageAlt" />
          </div>
          <div class="testimonial-card__author-info">
            <span class="testimonial-card__name">{{ t.name }}</span>
            <span class="testimonial-card__disc">{{ $t(t.disciplineKey) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { testimonials } from '~/data/testimonials'

const activeFilter = ref('all')

const filters = [
  { value: 'all', label: 'Tous' },
  { value: 'mma', label: 'MMA' },
  { value: 'prepa', label: 'Prépa' },
]

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? testimonials
    : testimonials.filter(item => item.tag === activeFilter.value)
)
</script>

<style scoped lang="sass">
.testimonials
  background-color: $black-mid

.testimonials__header
  @include section-pad($spacing-xl, $spacing-md, $spacing-xxl, $spacing-lg)
  display: flex
  flex-direction: column
  gap: $spacing-md

  @include lg
    flex-direction: row
    align-items: flex-end
    justify-content: space-between

// ─── Filters ─────────────────────────────────────────────────
.testimonials__filters
  display: flex
  gap: 0

.testimonials__filter
  @include caption(0.7rem)
  padding: 0.5rem 1.2rem
  background: none
  border: 1px solid rgba($white, 0.12)
  color: rgba($white, 0.4)
  cursor: pointer
  transition: all 0.2s ease
  margin-left: -1px

  &:hover
    color: $white
    border-color: rgba($white, 0.3)

  &--active
    background-color: $red
    border-color: $red
    color: $white

// ─── Grid ────────────────────────────────────────────────────
.testimonials__grid
  display: grid
  grid-template-columns: 1fr
  gap: $spacing-md
  @include section-pad(0, $spacing-xl, 0, $spacing-xxl)

  @include md
    grid-template-columns: repeat(2, 1fr)

// ─── Card ────────────────────────────────────────────────────
.testimonial-card
  background-color: $black-light
  padding: $spacing-md
  display: flex
  flex-direction: column
  gap: $spacing-md

.testimonial-card__quote
  @include text(0.95rem)
  color: rgba($white, 0.75)
  line-height: 1.75
  margin: 0
  flex: 1
  position: relative
  padding-left: $spacing-sm

  &::before
    content: '"'
    @include title(4rem)
    color: $red
    position: absolute
    top: -0.8rem
    left: -0.2rem
    line-height: 1

// ─── Author ──────────────────────────────────────────────────
.testimonial-card__author
  display: flex
  align-items: center
  gap: $spacing-sm

.testimonial-card__avatar
  width: 56px
  height: 56px
  border-radius: 50%
  overflow: hidden
  flex-shrink: 0
  background-color: $black-mid

.testimonial-card__author-info
  display: flex
  flex-direction: column
  gap: 0.2rem

.testimonial-card__name
  @include caption(0.75rem)
  color: $white

.testimonial-card__disc
  @include text(0.75rem)
  color: rgba($white, 0.45)
</style>
