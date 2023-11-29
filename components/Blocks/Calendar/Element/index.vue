<template>
  <div class="event" :class="props.eventData.sport.replaceAll(' ','-')">
    <p class="event__title">{{ props.eventData.sport }}</p>
    <div class="event__time">
      <p>{{ props.eventData.time }}</p>
      <p>{{ props.eventData.duration }}</p>
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

</script>


<style scoped lang="sass">
.event
  grid-row: v-bind(gridRow)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: rgba(255, 255, 255, 0.37)
  padding: 10px
  &__title
    color: white
    font-size: 15px
    display: grid
    place-items: center
    height: 100%
  &__time
    display: flex
    color: white
    font-size: 10px


</style>
