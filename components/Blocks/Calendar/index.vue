<template>
  <div class="planning">
    <h2 class="planning__title">{{ block.primary.title }}</h2>
    <prismic-rich-text class="planning__content" :field="block.primary.content" />
    <ul class="planning__filter">
      <li class="planning__filter__item" @click="filterEvents('clear')">Tout les cours</li>
      <li class="planning__filter__item" @click="filterEvents(sport.split(' ')[0])"  v-for="sport of getAllSports()">{{sport}}</li>
    </ul>
    <div class="planning__container" >
      <div class="planning__container__single" v-for="event of formatPlanning()">
        <p class="planning__container__single__day">{{ event[0].day }}</p>
        <div class="planning__container__single__events">
          <BlocksCalendarElement v-for="event of event" :eventData="event" />
        </div>
      </div>
      <IconDownload class="download" />
      <span class="asterix">* club partenaire</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  block: any
}>()

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
  console.log(sport)
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

</script>
<style scoped lang="sass">

.planning
  position: relative
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  padding: 4rem 0
  &__title
    @include h1()
    color: white
    text-align: center
    margin-top: 200px

  &__content
    @include text()
    color: white
    text-align: center
    margin-top: 50px
    max-width: 800px
    margin-bottom: 50px

  &__filter
    width: calc(5/6 * (100vw - 180px))
    display: flex
    justify-content: center
    align-items: center
    margin-top: 50px
    gap: 10px
    &__item
      @include text()
      color: white
      font-weight: bold
      margin: 10px
      cursor: pointer
      &:hover
        text-decoration: underline

  &__container
    position: relative
    background-color: #2E2E2E
    border-radius: 4px
    display: flex
    margin: 0 auto
    &__single
      width: calc((5/6 * (100vw - 180px)) / 6)
      &__day
        @include text()
        text-transform: uppercase
        color: white
        text-align: center
        padding: 20px
      &__events
        display: grid
        grid-template-columns: 1fr
        $v: calc( calc(((21 * 60) + 30) / 15) - calc(((10 * 60) + 30) / 15) ) // start at 10h30 // End at 21h30
        grid-template-rows: repeat($v, 0.8rem)

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
