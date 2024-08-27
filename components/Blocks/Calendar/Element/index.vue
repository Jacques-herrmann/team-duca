<template>
  <div class="event" :class="props.eventData.color.replace(' ', '-')">
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

  const offset = ((11 * 60)) / 15

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
  background-color: rgba(255, 255, 255, 0.8)
  border-radius: 2px
  margin: 1px
  padding: 10px
  gap: 3px
  overflow: hidden

  &__title
    @include title(2.8vw)
    text-align: center
    font-weight: 700
    letter-spacing: 0.05rem
    color: white
    display: grid
    place-items: center
    transition: transform 0.2s ease-in-out
    padding: 0 1.5rem
    @include lg
      @include title(16px, 100%)
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
      @include text(0.8rem)

  &.rouge
    background-color: rgba(201, 61, 61, 0.8)
  //background-color: #C93D3D

  &.violet
    background-color: rgba(139, 61, 201, 0.8)
  //background-color: #8B3DC9

  &.violet-clair
    background-color: rgba(188, 144, 224, 0.8)
  //background-color: #BC90E0

  &.orange
    background-color: rgba(255, 145, 2, 0.8)
  //background-color: #C9803D

  &.bleu
    background-color: rgba(61, 122, 201, 0.8)
  //background-color: #3D7AC9

  &.noir
    background-color: rgba(30, 30, 30, 0.8)

  &.blanc
    background-color: rgba(255, 255, 255, 0.9)

    & *
      color: rgb(30, 30, 30)

  &.gris
    background-color: rgba(120, 120, 120, 0.8)


  &:hover
    & .event__title
      transform: scale(1.05)
//& .event__time
//  transform: scale(1.05)


</style>
