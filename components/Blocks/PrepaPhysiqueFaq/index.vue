<template>
  <div class="prepa-faq">
    <AppSectionHeader :label="$t('prepa.faq.label')" :title="$t('prepa.faq.title')" />
    <div class="faq-list">
      <div v-for="i in 4" :key="i" class="faq-item">
        <button
            class="faq-item__question"
            :class="{ 'faq-item__question--open': openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
        >
          {{ $t(`prepa.faq.q${i}`) }}
          <span class="faq-item__arrow">{{ openFaq === i ? '−' : '+' }}</span>
        </button>
        <div v-show="openFaq === i" class="faq-item__answer">
          <p>{{ $t(`prepa.faq.a${i}`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const openFaq = ref(null)
</script>

<style scoped lang="sass">
.prepa-faq
  padding: $spacing-xl $spacing-md
  background-color: $black-mid
  display: flex
  flex-direction: column
  gap: $spacing-lg

  @include lg
    padding: $spacing-xxl 90px

.faq-list
  display: flex
  flex-direction: column
  border-top: 1px solid rgba($white, 0.08)

.faq-item
  border-bottom: 1px solid rgba($white, 0.08)

.faq-item__question
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  padding: $spacing-md 0
  background: none
  border: none
  color: $white
  cursor: pointer
  text-align: left
  @include sub(1rem)
  transition: color 0.2s ease

  &:hover,
  &--open
    color: $red

.faq-item__arrow
  @include title(1.5rem)
  color: $red
  flex-shrink: 0
  margin-left: $spacing-md

.faq-item__answer
  padding: 0 0 $spacing-md

  p
    @include text(0.95rem)
    color: rgba($white, 0.65)
    margin: 0
    line-height: 1.8
    max-width: 70ch
</style>
