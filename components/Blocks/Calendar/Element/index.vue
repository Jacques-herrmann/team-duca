<template>
  <div class="event" :class="props.eventData.sport.split(' ')[0].replace('*','')">
    <p class="event__title">{{ splitSport }}</p>
    <div class="event__time">
      <p>{{ props.eventData.time }}</p>-
      <p>{{ endTime }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">

const props = defineProps<{
  eventData: Object
}>()

const gridRow = computed(() => {

  // calculate the start and end of the event in 15 minute
  // calendar start at 10h30 so we need to substract 10h30 in 15 minute

  const offset = ((10 * 60) + 30) / 15

  const [starHour, starMinute] = props.eventData.time.split("h")
  const [endHour, endMinute] = props.eventData.duration.split("h")
  const start = (((parseInt(starHour) * 60) + parseInt(starMinute)) / 15) - offset
  const end = ((parseInt(endHour) * 60) + parseInt(endMinute)) / 15
  return `${start + 1} / ${end + start + 1}`
})

const endTime = computed(() => {
  const [starHour, starMinute] = props.eventData.time.split("h")
  const [dHour, dMinute] = props.eventData.duration.split("h")

  const start = ((parseInt(starHour) * 60) + parseInt(starMinute))
  const duration = ((parseInt(dHour) * 60) + parseInt(dMinute))

  const end = duration + start
  const hours = Math.floor(end / 60)
  let minutes = end % 60
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}h${minutes}`
})
const splitSport = computed(() => {
  const s = props.eventData.sport.split(' ')
  return s.shift() + '\n' + s.join(' ')
})

</script>


<style scoped lang="sass">
.event
  grid-row: v-bind(gridRow)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: rgba(255, 255, 255, 0.37)
  border-radius: 2px
  margin: 1px
  padding: 10px
  gap: 5px
  overflow: hidden
  &__title
    @include title(2.8vw)
    white-space: pre-line
    text-align: center
    font-weight: 700
    letter-spacing: 0.05rem
    color: white
    display: grid
    place-items: center
    transition: transform 0.2s ease-in-out
    @include lg
      @include title(20px, 100%)
      font-weight: 700

    .print &
      @include text(18px, 100%)
      letter-spacing: unset !important

  &__time
    @include text(2vw)
    display: flex
    color: white
    gap: 2px
    transition: transform 0.2s ease-in-out
    @include lg
      @include text()

  &.MMA
    background-color: #C93D3D

  &.JJB
    background-color: #8B3DC9

  &.Grappling
    background-color: #C9803D

  &.Kick-boxing
    background-color: #3DC9AF

  &:hover
    & .event__title
      transform: scale(1.05)
    //& .event__time
    //  transform: scale(1.05)


</style>
