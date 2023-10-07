<template>
  <div class="contact-page">
    <h1>Contact</h1>
    <form class="contact-page__form" name="contact" netlify>
      <p>
        <label>Name <input type="text" name="name" /></label>
      </p>
      <p>
        <label>Email <input type="email" name="email" /></label>
      </p>
      <p>
        <button type="submit" @submit="onSubmit">Send</button>
      </p>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useReCaptcha } from "vue-recaptcha-v3";

const prismic = usePrismic();
const route = useRoute();

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

const recaptchaInstance = useReCaptcha();
const recaptcha = async () => {
    // optional you can await for the reCaptcha load
    await recaptchaInstance?.recaptchaLoaded();

    // get the token, a custom action could be added as argument to the method
    return recaptchaInstance?.executeRecaptcha('contact');
};

const onSubmit = async (e: Event) => {
  e.preventDefault();
  const token = await recaptcha();
  console.log(token);
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "form-name": form.getAttribute("name"),
      "g-recaptcha-response": token,
      ...data,
    }).toString(),
  });
  console.log(response);
};

</script>

<style scoped lang="sass">
.contact-page
  min-height: 100vh
  width: 100%

  &__form
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    & button
      margin-top: 1rem
      padding: 0.5rem 1rem
      border: 1px solid black
      border-radius: 0.5rem
      background-color: white
      cursor: pointer
h1
  color: red
</style>
