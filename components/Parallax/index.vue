<template>
  <div :style="getStyle()" ref="parallax" class="parallax" :class="isAbsolute? 'parallax--is-absolute':''">
    <slot/>
  </div>
</template>

<script>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useIndexStore} from "~/stores/index.js";

export default {
  name: 'Parallax',
  props: {
    position: {
      type: Object,
      default: null,
    },
    speed: {
      type: Number,
      default: 1,
    },
    speedMobile: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
      default: 'center',
    },
    min: {
      type: Number,
      default: -9999,
    },
    max: {
      type: Number,
      default: 9999,
    },
    isAbsolute: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const parallax = ref(null)

    const top = ref(0)
    const bottom = ref(0)
    const lastTransform = ref('')

    const store = useIndexStore()
    const isMobile = computed(() => store.isMobile)
    const scroll = computed(() => store.scroll?.scroll || 0)

    let hasVideo = ref(0)

    const getStyle = () => {
      const style = {};

      if (props.position) {
        const {left, top, leftMobile, topMobile} = props.position;
        if (left !== 'undefined') {
          if (isMobile.value) {
            style.left = leftMobile + '%';
            style.top = topMobile + '%';
          } else {
            style.left = left + '%';
            style.top = top + '%';
          }
        }
      }

      if (props.active) {

        const viewportOffsetTop = window.innerHeight - (top.value - scroll.value);
        const viewportOffsetBottom = window.innerHeight - (bottom.value - scroll.value);

        let offset, scrollFactor, speed;
        if (isMobile.value) {
          speed = props.speedMobile || 1;
          //speed = 0.2
        } else {
          speed = props.speed || 1;
        }

        switch (props.align) {
          case 'bottom':
            scrollFactor = viewportOffsetBottom / window.innerHeight;
            offset = (0 - scrollFactor) * speed * 100;
            break;
          default:
          case 'center':
            scrollFactor = viewportOffsetTop / window.innerHeight / 2;
            offset = (0.5 - scrollFactor) * speed * 100;
            break;
        }

        offset = Math.max(props.min, Math.min(props.max, offset));

        lastTransform.value =`translate3d(0, calc(${props.isAbsolute ? '-50' : '0'}% + ${offset}px), 0)`;
        // }

        if (lastTransform.value) {
          style.transform = lastTransform.value;
        }

        return style;
      }
    }

    const onResize = () => {
      const bounds = parallax.value.parentElement.getBoundingClientRect();
      top.value = scroll.value + bounds.top;
      bottom.value = scroll.value + bounds.bottom;
    }

    onMounted(() => {
      onResize();
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    watch(() => props.active, () => {
      onResize();
    })

    return {
      parallax,
      getStyle,
      lastTransform,
      bottom,
      scroll,
      isMobile
    }
  }
}
</script>
<style scoped lang="sass">
.parallax--is-absolute
  position: absolute
  width: 100%
  height: 75%
  top: 50%

</style>