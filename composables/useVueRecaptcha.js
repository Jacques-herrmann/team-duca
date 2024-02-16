import {useReCaptcha, VueReCaptcha} from 'vue-recaptcha-v3';
import {useNuxtApp} from '#app';

export const useVueRecaptcha = async () => {
  const {vueApp} = useNuxtApp();
  const config = useRuntimeConfig();
  vueApp.use(VueReCaptcha, {
    siteKey: config.public.RECAPTCHA_SITE_KEY,
    loaderOptions: {
      autoHideBadge: true,
    },
  });
  const {executeRecaptcha, recaptchaLoaded} = useReCaptcha();
  await recaptchaLoaded();
  return await executeRecaptcha('login');
};