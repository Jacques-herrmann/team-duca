<template>
  <div class="planning">
    <h2>PLANNING</h2>
    <ul class="planning__filter">
      <li class="planning__filter__item" @click="filterEvents('clear')">Tout les cours</li>
      <li class="planning__filter__item" @click="filterEvents(sport.replaceAll(' ','-'))"  v-for="sport of getAllSports()">{{sport}}</li>
    </ul>
    <div class="planning__container" >
      <div class="planning__container__single" v-for="event of formatPlanning()">
        <p class="planning__container__single__day">{{ event[0].day }}</p>
        <div class="planning__container__single__events">
          <BlocksCalendarElement v-for="event of event" :eventData="event" />
        </div>
      </div>
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
    if (!acc.includes(event.sport)) {
      acc.push(event.sport)
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
    const toHide = document.querySelectorAll(`.event:not(.${sport})`)
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
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

  & h2
    @include h1()
    color: white
    text-align: center
    margin-top: 200px

  &__filter
    display: flex
    justify-content: center
    align-items: center
    margin-top: 50px
    &__item
      color: white
      font-size: 15px
      margin: 0 10px
      cursor: pointer
      &:hover
        text-decoration: underline
  &__container
    background-color: #2E2E2E
    display: flex
    margin: 0 auto
    &__single
      &__day
        font-size: 20px
        color: white
        text-align: center
        padding: 20px
      &__events
        display: grid
        grid-template-columns: 1fr
        $v: calc( calc(((21 * 60) + 30) / 15) - calc(((10 * 60) + 30) / 15) ) // start at 10h30 // End at 21h30
        grid-template-rows: repeat($v, 10px)



</style>
