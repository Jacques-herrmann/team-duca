<template>
  <div class="planning" ref="root">
    <h2 class="planning__title">
      <span class="planning__title--letter" v-for="l in block.primary.title">{{ l }}</span>
    </h2>
    <prismic-rich-text class="planning__content" :field="block.primary.content" />
    <ul class="planning__filter">
      <li class="planning__filter__item" @click="filterEvents('clear')">Tous les cours</li>
      <li class="planning__filter__item" @click="filterEvents(sport.split(' ')[0])"  v-for="sport of getAllSports()">{{sport}}</li>
    </ul>
    <div class="planning__container" >
      <div class="planning__container__single" v-for="event of formatPlanning()">
        <p class="planning__container__single__day">{{ event[0].day }}</p>
        <div class="planning__container__single__events">
          <BlocksCalendarElement v-for="event of event" :eventData="event" />
        </div>
      </div>
      <IconDownload class="download" @click="downloadCalendar"/>
      <span class="asterix">* club partenaire</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import gsap from "gsap";
import A from "@/assets/animations";
import {shuffle} from "~/utils/math";
import { jsPDF } from "jspdf"

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const intersect = useIntersect(root, {
  threshold: 0.4,
  rootMargin: '100px 0px 0px 0px',
  onReveal: () => {
    draw()
  },
})
const tl = gsap.timeline({ paused: true })

const downloadCalendar = () => {
  const doc = new jsPDF()
  const calendar = document.querySelector('.planning__container') as HTMLElement
  doc.html(calendar,  {
    x: 3,
    y: 3,
    html2canvas: {
      scale: 0.14,
      windowWidth: 1920,
      windowHeight: 1080,
    },
    callback: function (doc) {
      doc.save('team-duca-planning.pdf')
    },
  })
}
const formatPlanning = () => {
  return props.block.items.reduce((acc: any, event: any) => {
    const day = event.day
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(event)
    return acc
  }, {})
}
const getAllSports = () => {
  // get sports to filter
  return props.block.items.reduce((acc: any, event: any) => {
    const sport = event.sport.split(' ')[0]
    if (!acc.includes(sport)) {
      acc.push(sport)
    }
    return acc
  }, [])
}
const filterEvents = (sport: string) => {
  // console.log(sport)
  // filter events by sport
  const all = document.querySelectorAll(".event")
  all.forEach((el: any) => {
    el.style.opacity = "1"
  })
  if (sport !== 'clear') {
    const s = sport.replace('*','')
    const toHide = document.querySelectorAll(`.event:not(.${s})`)
    toHide.forEach((el: any) => {
      el.style.opacity = "0"
    })
  }
}

const draw = () => {
  tl.play()
}

onMounted(() => {
  tl.from(root.value?.querySelectorAll('.planning__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.planning__content') as NodeListOf<HTMLElement>, A.opacity, 0.2)
  tl.from(root.value?.querySelectorAll('.planning__container') as NodeListOf<HTMLElement>, {
    height: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, 0.6)
  tl.from(root.value?.querySelectorAll('.planning__filter') as NodeListOf<HTMLElement>, A.opacity, 0.6)
  tl.from(root.value?.querySelectorAll('.download') as NodeListOf<HTMLElement>, A.opacity, 0.8)
  tl.from(root.value?.querySelectorAll('.asterix') as NodeListOf<HTMLElement>, A.opacity, 0.8)

  let elements = root.value?.querySelectorAll('.planning__container .event') as NodeListOf<HTMLElement>
  elements = shuffle(Array.from(elements))
  tl.from(elements, {
    height: 0,
    padding: 0,
    duration: 0.6,
    stagger: 0.02,
    ease: 'power3.out',
  }, 1.2)

})

</script>
<style scoped lang="sass">

.planning
  position: relative
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  padding: 4rem 0 10rem 0
  &__title
    @include h1(16vw)
    margin-top: 80px
    color: white
    text-align: center
    overflow: hidden
    & span
      display: inline-block
      white-space: pre
      will-change: transform

    @include lg
      @include h1()
      margin-top: 200px

  &__content
    @include text(4vw)
    color: white
    text-align: center
    margin-top: 50px
    max-width: 800px
    margin-bottom: 50px
    padding: 0 20px
    @include lg
      @include text()
      padding: 0

  &__filter
    width: 100vw
    display: flex
    justify-content: center
    align-items: center
    margin-top: 50px
    gap: 10px
    @include xl
      width: calc(5/6 * (100vw - 180px))

    &__item
      @include text(2.8vw)
      color: white
      font-weight: bold
      margin: 10px
      cursor: pointer
      &:hover
        text-decoration: underline

      @include lg
        @include text()

  &__container
    position: relative
    background-color: #2E2E2E
    border-radius: 4px
    display: flex
    margin: 0 auto
    &__single
      width: calc((100vw - 20px) / 6)

      @include xl
        width: calc((100vw - 180px) / 6)
        //min-width: 110px
      &__day
        @include text(2.6vw)
        text-transform: uppercase
        color: white
        text-align: center
        padding: 10px 5px
        @include lg
          @include text()
          padding: 20px
      &__events
        display: grid
        grid-template-columns: 1fr
        $v: calc( calc(((21 * 60) + 30) / 15) - calc(((10 * 60) + 30) / 15) ) // start at 10h30 // End at 21h30
        grid-template-rows: repeat($v, 0.8rem)
        @include md
          grid-template-rows: repeat($v, 1rem)

    & .download
      position: absolute
      bottom: 1rem
      right: 1rem
      width: 1.2rem
      height: 1.2rem
      cursor: pointer

    & .asterix
      position: absolute
      bottom: -1.5rem
      right: 0
      @include text(0.8rem)
      color: rgba(255, 255, 255, 0.4)




</style>
