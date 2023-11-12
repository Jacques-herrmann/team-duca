<template>
  <div class="aspect-ratio" :class="getClasses" :style="wrapperStyle" ref="elt">
    <div class="aspect-ratio__inner" :style="innerStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import {computed, onMounted, ref} from "vue";

export default {
  name: 'AspectRatio',
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    ratio: {
      type: [String, Number],
      default: '1:1'
    },
  },
  setup(props) {
    const elt = ref(null)
    const r = ref(0)
    const h = ref(0)
    const w = ref(0)
    const wrapperStyle = computed(() => {
      return {
        width: `${w.value}px`,
        height: `${h.value}px`,
      }
    })
    const innerStyle = computed(() => {
      return {
        paddingBottom: `${h.value}px`,
        '--ratioHeight': `${h.value}px`,
      }
    })
    const getClasses = computed(() => {
      return 'full-width'
      // return {
      //   'full-width': r.value <= w.value / h.value,
      //   'full-height': r.value > w.value / h.value,
      // }
    })

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      let width = props.width
      if (typeof props.width === 'string' && props.width.includes('%')) {
        width = elt.value.parentElement.offsetWidth * (parseInt(props.width.replace('%', '')) / 100)
      }
      if (typeof props.ratio === 'string') {
        [w.value, h.value] = props.ratio.split(":").map(v => parseInt(v))
        r.value = h.value / w.value
      } else {
        r.value = props.ratio
      }
      w.value = width
      h.value = w.value / r.value
    }

    return {
      elt,
      wrapperStyle,
      innerStyle,
      getClasses,
      r,
      w,
      h
    }
  },
}
</script>

<style scoped lang="sass">
.aspect-ratio
  position: relative

  &__inner
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden

.full-width
  & :deep(.figure-element) > img
    width: 100%
    //
    height: 100%

.full-height
  & :deep(.figure-element) > img
    height: 100%


</style>