<template>
  <div class="contact-page" ref="root">
    <Snackbar ref="snackbar"/>
    <figure-element class="contact-page__cover" :image="contactPage?.data.image"/>
    <h1 class="contact-page__title">
      <div v-for="t in title"><span>{{ t }}</span></div>
    </h1>
    <div class="contact-page__right">
      <prismic-rich-text class="contact-page__content" :field="contactPage?.data.subtitle"/>
      <div class="contact-page__form">
        <form
          ref="form"
          class="contact-page__form"
          name="contact"
          netlify
          netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
          @submit="onSubmit"
        >
          <input type="hidden" name="form-name" value="contact"/>
          <p class="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field"/>
            </label>
          </p>
          <p>
            <input type="email" name="email" placeholder="EMAIL"/>
          </p>
          <p>
            <textarea type="text" name="message" :rows="isMobile ? 6: 10" placeholder="VOTRE MESSAGE"/>
          </p>
          <CTA class="contact-page__cta" text="envoyer" :is-nuxt-link="false"/>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import gsap from "gsap";
import A from "assets/animations";
import {VueReCaptcha} from 'vue-recaptcha-v3';
import Timeline = gsap.core.Timeline;

const prismic = usePrismic();
const store = useIndexStore();
const page = usePage();
const config = useRuntimeConfig();

const {data: contactPage} = await useAsyncData("contact", () => prismic.client.getSingle('contact'))
// console.log(contactPage)

useSeoMeta({
  title: 'SCIENCE DUCA - CONTACT',
  ogTitle: 'LOCATION CAGE MMA MARSEILLE - CONTACT',
  twitterTitle: 'LOCATION CAGE MMA MARSEILLE - CONTACT',
  description: 'Contactez-nous pour toute question ou demande d\'information sur le club SCIENCE DUCA.\nRemplissez le formulaire de contact ou contactez nous sur Instagram pour nous joindre',
  ogDescription: 'Contactez-nous pour toute question ou demande d\'information sur le club SCIENCE DUCA.\nRemplissez le formulaire de contact ou contactez nous sur Instagram pour nous joindre',
  twitterDescription: 'Contactez-nous pour toute question ou demande d\'information sur le club SCIENCE DUCA.\nRemplissez le formulaire de contact ou contactez nous sur Instagram pour nous joindre',
  ogImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterImage: 'https://images.prismic.io/team-duca/19022be4-3ea4-4f3c-8bb3-0e9edb49bf2d_meta.png?auto=compress,format',
  twitterCard: 'summary_large_image',
})

const root = ref<HTMLElement | null>(null)
const snackbar = ref<HTMLElement | null>(null)
const title = computed(() => contactPage.value?.data.titre.split('\n'))
const isMobile = computed(() => store.isMobile)
let tl = <Timeline | null>null

const token = ref('')

watch(() => store.isTransitionVisible, (value) => {
  if (!value) {
    setTimeout(() => {
      tl?.play()
    }, 280)
  }
})

const onSubmit = async (e: Event) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form) as any

  formData.set('g-recaptcha-response', token.value)


  fetch("/", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      form.reset()
      snackbar.value?.show('Votre message a bien été envoyé')
    })
    .catch((error) => {
      snackbar.value?.show('Une erreur est survenue, veuillez réessayer', 'error')
    })
}

const {vueApp} = useNuxtApp();
vueApp.use(VueReCaptcha, {
  siteKey: config.public.RECAPTCHA_SITE_KEY,
  loaderOptions: {
    autoHideBadge: true,
  },
});

onMounted(async () => {
  tl = gsap.timeline({paused: true})
  tl.from(root.value?.querySelectorAll(".contact-page__cover") as NodeList, A.imageWidth, 0)
  tl.from(root.value?.querySelectorAll(".contact-page__title span") as NodeList, A.h2, 0.4)
  tl.from(root.value?.querySelectorAll(".contact-page__content") as NodeList, A.opacity, 0.4)
  tl.from(root.value?.querySelectorAll(".contact-page__form") as NodeList, A.opacity, 0.5)
  tl.from(root.value?.querySelectorAll(".contact-page__cta") as NodeList, A.opacity, 0.6)

  token.value = await useVueRecaptcha()
  // console.log(token.value)
})
</script>

<style scoped lang="sass">
.contact-page
  position: relative
  min-height: 100vh
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  @include lg
    flex-direction: row

  &__title
    @include h1(18vw)
    position: absolute
    top: 60px
    left: 55px
    font-weight: 800
    color: $white

    & > div
      overflow: hidden

    & span
      display: inline-block

    @include md
      top: 80px
      left: 65px
      height: 4.1rem

    @include lg
      top: 160px
      left: 45%
      @include h1(7.5rem)


  &__right
    @include text()
    width: 100%
    height: 60vh
    padding: 35px
    display: flex
    flex-direction: column

    @include md
      @include text(1.5rem)
      padding: 45px
      width: 100%

    @include lg
      padding: 45px
      width: 50%
      height: 100vh
      justify-content: flex-end

  &__cta
    align-self: center
    @include lg
      align-self: end

  &__form
    display: flex
    flex-direction: column
    gap: 2rem
    color: $white

    & input, textarea
      @include text(0.8rem)
      background: rgba(255, 255, 255, 0.03)
      border: none
      border-bottom: 1px solid $white
      color: $white
      padding: 0.8rem
      outline: none
      width: 100%

      &::placeholder
        color: $white
        opacity: 0.8

      @include md
        @include text(1.5rem)

      @include lg
        @include text(0.8rem)

  &__cover
    width: 100%
    height: 40vh
    object-fit: cover
    object-position: center
    @include md
      height: 50vh

    @include lg
      width: 50%
      height: 100vh
      height: calc(var(--vh, 1vh) * 100)
      margin-bottom: 2rem


  &__content
    @include text()
    color: $white
    margin-bottom: 1.5rem

    @include md
      @include text(1.5rem)

    @include lg
      @include text(1.2rem)

.hidden
  display: none
</style>
