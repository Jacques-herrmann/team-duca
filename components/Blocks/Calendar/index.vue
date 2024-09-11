<template>
  <div class="planning" ref="root">
    <h2 class="planning__title">
      <span class="planning__title--letter" v-for="l in block.primary.title">{{ l }}</span>
    </h2>
    <prismic-rich-text class="planning__content" :field="block.primary.content"/>
    <div class="planning__container">
      <img class="planning__bg" :src="block.primary.background.url" alt="calendar">
      <div class="planning__container__single" v-for="(dayEvents, day) in formatPlanning()" :key="day">
        <p class="planning__container__single__day">{{ day }}</p>
        <div class="planning__container__single__events">
          <BlocksCalendarElement
              v-for="event in dayEvents"
              :key="event.id"
              :eventData="event"
          />
        </div>
      </div>
      <IconDownload class="download" @click="downloadCalendar"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import gsap from "gsap"
import A from "@/assets/animations"
import { shuffle } from "~/utils/math"
import { jsPDF } from "jspdf"
import { useIndexStore } from "~/stores"
import BlocksCalendarElement from './Element/index.vue'  // Assurez-vous que le chemin est correct
import IconDownload from '~/components/Icon/Download'

const props = defineProps<{
  block: any
}>()

const root = ref<HTMLElement | null>(null)
const store = useIndexStore()
const isMobile = computed(() => store.isMobile)


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
const addKey = (events: any) => {
  return events.reduce((acc: any, event: any, index: number) => {
    const [startHour, startMinute] = event.time.split("h")
    const [dHour, dMinute] = event.duration.split("h")
    const start = ((parseInt(startHour) * 60) + parseInt(startMinute))
    const duration = ((parseInt(dHour) * 60) + parseInt(dMinute))
    const end = duration + start
    const nextEvent = events[index + 1]
    if (nextEvent) {
      const [nextStartHour, nextStartMinute] = nextEvent.time.split("h")
      const [nextDHour, nextDMinute] = nextEvent.duration.split("h")
      const nextStart = ((parseInt(nextStartHour) * 60) + parseInt(nextStartMinute))
      const nextDuration = ((parseInt(nextDHour) * 60) + parseInt(nextDMinute))
      const nextEnd = nextDuration + nextStart
      if (nextStart < end) {
        event.splice = '1'
        nextEvent.splice = '2'
      }
    }
    acc.push(event)
    return acc
  }, [])
}


let events = props.block.items
let formattedEvents = formatPlanning()
let formattedEventsWithKey = Object.keys(formattedEvents).reduce((acc: any, day: string) => {
  acc[day] = addKey(formattedEvents[day])
  return acc
}, {})
formatPlanning()

const downloadCalendar = () => {
  const doc = new jsPDF()
  const calendar = document.querySelector('.planning__container') as HTMLElement
  calendar.classList.add('print')
  doc.html(calendar, {
    autoPaging: false,
    windowWidth: 1920,
    width: 1920,
    height: 1080,
    html2canvas: {
      scale: 0.14,
      windowWidth: 1920 * 0.88,
      windowHeight: 1080 * 0.88,
      width: 1920,
      height: 1080,
    },
    callback: function (doc) {
      doc.save('team-duca-planning.pdf')
      calendar.classList.remove('print')
    },
  })
}

const draw = () => {
  tl?.play(0)
}

let tl: gsap.core.Timeline | null = null

onMounted(() => {
  tl = gsap.timeline({ paused: true })
  tl.from(root.value?.querySelectorAll('.planning__title--letter') as NodeListOf<HTMLElement>, A.title)
  tl.from(root.value?.querySelectorAll('.planning__content') as NodeListOf<HTMLElement>, A.opacity, 0.2)
  tl.fromTo(root.value?.querySelectorAll('.planning__container') as NodeListOf<HTMLElement>, { height: 0 }, {
    height: 'calc(50 * 0.9rem + 2.6vw)',
    duration: 0.6,
    ease: 'power3.out',
  }, 0.6)
  tl.from(root.value?.querySelectorAll('.download') as NodeListOf<HTMLElement>, A.opacity, 0.8)

  let elements = root.value?.querySelectorAll('.planning__container .event') as NodeListOf<HTMLElement>
  elements = shuffle(Array.from(elements))
  tl.from(elements, {
    height: 0,
    padding: 0,
    duration: 0.6,
    stagger: 0.02,
    ease: 'power3.out',
  }, 1.2)

  tl.from(root.value?.querySelectorAll('.planning__bg') as NodeListOf<HTMLElement>, A.opacity, 1.2)

  window.addEventListener('resize', draw)
  draw()  // Appel initial pour dessiner le planning
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

  &__container
    position: relative
    background-color: #2E2E2E
    border-radius: 4px
    display: flex
    margin: 0 auto

    &__single
      width: calc((100vw - 20px) / 6)
      z-index: 1

      @include xl
        width: calc((100vw - 180px) / 6)

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
        //grid-template-columns: 1fr
        // two columns
        grid-template-columns: repeat(2, 1fr)
        $v: calc(calc(((21 * 60) + 30) / 15) - calc(((10 * 60)) / 15))
        grid-template-rows: repeat($v, 0.9rem)

    & .download
      position: absolute
      bottom: 1rem
      right: 1rem
      width: 1.2rem
      height: 1.2rem
      cursor: pointer
      z-index: 2

  &__bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    opacity: 0.25

    .print &
      display: none
</style>
