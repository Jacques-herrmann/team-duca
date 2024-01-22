<template>
  <div class="contact-page" ref="root">
    <figure-element class="contact-page__cover" :image="contactPage?.data.image"/>
    <h1 class="contact-page__title">
      <div v-for="t in title"><span>{{t}}</span></div>
    </h1>
    <div class="contact-page__right">
      <prismic-rich-text class="contact-page__content" :field="contactPage?.data.subtitle" />
      <div class="contact-page__form">
        <form
         ref="form"
         class="contact-page__form"
         name="contact"
         netlify
         netlify-honeypot="bot-field"
        >
          <p class="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>
          <p>
            <input type="email" name="email" placeholder="EMAIL"/>
          </p>
          <p>
            <textarea type="text" name="message" :rows="isMobile ? 6: 10" placeholder="VOTRE MESSAGE" />
          </p>
          <CTA class="contact-page__cta" text="send"  :is-nuxt-link="true"/>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import gsap from "gsap";
import A from "assets/animations";

const prismic = usePrismic();
const store = useIndexStore();
const page = usePage();

// const form = ref<HTMLFormElement | null>(null);

const {data: contactPage } = useAsyncData("[contact]", () => prismic.client.getSingle('contact'))
console.log(contactPage)

useHead({
  title: contactPage.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: contactPage.value?.data.meta_description,
    },
  ],
});

const root = ref<HTMLElement | null>(null)
const title = computed(() => contactPage.value?.data.titre.split('\n'))
const tl = gsap.timeline({paused: true})
const isMobile = computed(() => store.isMobile)

watch(() => store.isTransitionVisible, (value) => {
  if(!value) {
    setTimeout(() => {
      tl.play()
    }, 280)
  }
})


onMounted(() => {
  tl.from(root.value?.querySelectorAll(".contact-page__cover") as NodeList, A.imageWidth, 0)
  tl.from(root.value?.querySelectorAll(".contact-page__title span") as NodeList, A.h2, 0.4)
  tl.from(root.value?.querySelectorAll(".contact-page__content") as NodeList, A.opacity, 0.4)
  tl.from(root.value?.querySelectorAll(".contact-page__form") as NodeList, A.opacity, 0.5)
  tl.from(root.value?.querySelectorAll(".contact-page__cta") as NodeList, A.opacity, 0.6)

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
      padding: 0 45px
      margin-top: 18rem
      width: 50%
      justify-content: flex-end

  &__cta
    align-self: end

  &__form
    display: flex
    height: 100%
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
