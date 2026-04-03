<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__brand">
        <span class="footer__logo">SCIENCE DUCA</span>
        <p class="footer__tagline">{{ $t('footer.tagline') }}</p>
      </div>

      <div class="footer__links">
        <span class="footer__links-title">{{ $t('footer.links') }}</span>
        <nav>
          <nuxt-link
            v-for="item in regularItems"
            :key="item.path"
            class="footer__link"
            :to="localePath(item.path)"
          >
            {{ $t(item.labelKey) }}
          </nuxt-link>
        </nav>
      </div>

      <div class="footer__contact">
        <p class="footer__contact-line">{{ $t('contact.address') }}</p>
        <p class="footer__contact-line">{{ $t('contact.addressDetail') }}</p>
        <p class="footer__contact-line">{{ $t('contact.city') }}</p>
        <p class="footer__contact-line footer__contact-line--accent">{{ $t('contact.email') }}</p>
        <p class="footer__contact-line">{{ $t('contact.hours') }}</p>
      </div>
    </div>

    <div class="footer__bottom">
      <span>© {{ currentYear }} Science DUCA — {{ $t('footer.rights') }}</span>
      <div class="footer__legal-links">
        <nuxt-link :to="localePath('/mentions-legales')" class="footer__legal">{{ $t('footer.legal') }}</nuxt-link>
        <span class="footer__legal-sep" aria-hidden="true">·</span>
        <nuxt-link :to="localePath('/politique-confidentialite')" class="footer__legal">{{ $t('footer.privacy') }}</nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { navItems } from '~/data/navigation'

const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
const regularItems = computed(() => navItems.filter(i => !i.highlight))
</script>

<style scoped lang="sass">
.footer
  background-color: $black-mid
  border-top: 1px solid rgba($white, 0.06)

// ─── Top ─────────────────────────────────────────────────────
.footer__top
  display: flex
  flex-direction: column
  gap: $spacing-lg
  padding: $spacing-xl $spacing-md

  @include lg
    flex-direction: row
    justify-content: space-between
    align-items: flex-start
    padding: $spacing-xl 90px

// ─── Brand ───────────────────────────────────────────────────
.footer__logo
  @include title(2rem)
  color: $white
  display: block
  margin-bottom: 0.5rem

.footer__tagline
  @include text(0.85rem)
  color: rgba($white, 0.4)
  margin: 0

// ─── Links ───────────────────────────────────────────────────
.footer__links-title
  @include stamp(0.7rem)
  display: block
  margin-bottom: $spacing-sm

.footer__links nav
  display: flex
  flex-direction: column
  gap: 0.5rem

.footer__link
  @include text(0.85rem)
  color: rgba($white, 0.5)
  text-decoration: none
  transition: color 0.2s ease

  &:hover
    color: $red

// ─── Contact ─────────────────────────────────────────────────
.footer__contact-line
  @include text(0.85rem)
  color: rgba($white, 0.5)
  margin: 0 0 0.3rem

  &--accent
    color: rgba($white, 0.7)

// ─── Bottom ──────────────────────────────────────────────────
.footer__bottom
  display: flex
  flex-direction: column
  align-items: center
  gap: 0.5rem
  padding: $spacing-sm $spacing-md
  border-top: 1px solid rgba($white, 0.06)
  text-align: center

  @include lg
    flex-direction: row
    justify-content: space-between
    padding: $spacing-sm 90px

  span
    @include text(0.75rem)
    color: rgba($white, 0.3)

.footer__legal-links
  display: flex
  align-items: center
  gap: 0.75rem

.footer__legal-sep
  @include text(0.75rem)
  color: rgba($white, 0.15)

.footer__legal
  @include text(0.75rem)
  color: rgba($white, 0.3)
  text-decoration: none
  transition: color 0.2s ease

  &:hover
    color: $white
</style>
