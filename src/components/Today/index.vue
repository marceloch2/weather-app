<template>
  <div class="today" v-if="weatherData.weather">
    <img :src=" `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`">
    <p>{{ weatherData.weather[0].description }}</p>
    <p>
      <span class="metric" v-html="metric"></span>
      <strong>{{ weatherData.main.temp }}</strong>
    </p>
    <p>
      Wind speed:
      <strong>{{ weatherData.wind.speed }}</strong>
    </p>
    <p>{{ location.city }}</p>
    <p>{{ location.country }}</p>
  </div>
</template>

<script>
import Today from "./today";
export default Today;
</script>

<style lang="sass" scoped>
	@import 'today.scss'
</style>
