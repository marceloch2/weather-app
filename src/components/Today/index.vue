<template>
  <div class="today" v-if="weatherData.weather && !hasError && location.city">
    <img
      class="today__img"
      :src=" `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`"
    >

    <p class="today__condition">{{ weatherData.weather[0].description }}</p>

    <p>
      <span class="metric" v-html="metric"></span>
      <strong>{{ weatherData.main.temp }}</strong>
    </p>

    <p>
      Wind speed:
      <strong>{{ weatherData.wind.speed }}</strong>
      <span class="metric" v-html="wind_speed"></span>
    </p>

    <p>
      Humidity:
      <strong>{{ weatherData.wind.speed }}</strong>
      <span class="metric" v-html="humidity"></span>
    </p>

    <p class="today__city">City: {{ location.city }}</p>
  </div>
</template>

<script>
import Today from "./today";
export default Today;
</script>

<style lang="sass" scoped>
	@import 'today.scss'
</style>
