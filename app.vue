<template>
  <NuxtLayout/>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import Lenis from "./utils/lenis/lenis";
import gsap from "gsap";
import {useNuxtApp} from "nuxt/app";
import {useIndexStore} from "~/stores/index.js";

export default {
  name: 'App',
  setup() {
    const scroll = ref(null)
    const store = useIndexStore()
    let scrollY = 0

    const onResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      store.setIsMobile(window.innerWidth < 1024)
    };
    const onScroll = (ev) => {
      const direction = Math.sign(ev.velocity)
      if (!direction) return
      if (ev.velocity > -1) {
        scrollY += 1
        if (scrollY > 40) {
          document.body.classList.add('scrolling-down')
        }
      } else {
        scrollY = 0
        document.body.classList.remove('scrolling-down')
      }
    }

    onMounted(() => {
      scroll.value = new Lenis()
      store.setScroll(scroll.value)

      scroll.value.on('scroll', onScroll)
      gsap.ticker.add(scroll.value.raf.bind(scroll.value))

      onResize();
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      scroll.value.off('scroll', onScroll)
      gsap.ticker.remove(scroll.value.raf.bind(scroll.value))
      window.removeEventListener('resize', onResize);
    });

    const nuxtApp = useNuxtApp()

    nuxtApp.hook("page:start", () => {
      if (!scroll.value) {
        window.scrollTo(0, 0)
      } else {
        scroll.value.smooth = false
        scroll.value.scrollTo(0, 0)
        scroll.value.smooth = true
      }
    })

    return {}
  }
};
</script>
