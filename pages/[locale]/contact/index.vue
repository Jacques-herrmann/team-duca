<template>
  <div class="contact-page">
    <img :src="page?.data.image.url" alt="page?.data.image.url">
    <div class="contact-page__form">
      <h1 class="contact-page__title">{{ page?.data.titre }}</h1>
      <p  class="contact-page__sub">{{ page?.data.sous_titre }}</p>
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
          <label>Name <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Email <input type="email" name="email" /></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>

const prismic = usePrismic();
const route = useRoute();

// const form = ref<HTMLFormElement | null>(null);

const {data: page } = useAsyncData("[contact]", () => prismic.client.getSingle('contact'))
console.log(page)

useHead({
  title: page.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: page.value?.data.meta_description,
    },
  ],
});

</script>

<style scoped lang="sass">
.contact-page
  width: 100%
  margin-top: $header-height
  padding: 90px
  display: flex
  align-items: center
  gap: 90px

  & > img
    width: calc(100% / 6 * 3)
    object-fit: cover

  &__form
    display: flex
    height: 100%
    flex-direction: column
    gap: 1rem
    color: $white


    & button
      margin-top: 1rem
      padding: 0.5rem 1rem
      border: 1px solid black
      border-radius: 0.5rem
      background-color: white
      cursor: pointer

  &__title
    @include h1()
    color: $white

  &__sub
    @include sub()
    color: $red

.hidden
  display: none
</style>
