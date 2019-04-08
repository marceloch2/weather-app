<template>
  <div class="weather__chart">
    <div class="weather__chart-tool-wrapper">
      <div v-for="(_type, i) in types" :key="i" class="weather__chart-tool">
        <button
          v-bind:class="[_type === type ? activeClass : '']"
          :disabled="type === _type"
          @click="changeType(_type)"
        >{{formatTitle(_type)}}</button>
      </div>
    </div>

    <div class="weather__chart-content">
      <div class="weather__chart-info">
        <img
          class="weather__chart-img"
          v-if="currentWeatherIcon"
          :src=" `http://openweathermap.org/img/w/${currentWeatherIcon}.png`"
        >
        <p class="weather__chart-data" v-if="currentWeatherData">
          <span v-if="type === 'temperature'" class="metric" v-html="metric"></span>
          <span name="weather__chart-data-value">{{ currentWeatherData }}</span>
          <span v-if="type === 'wind_speed'" class="metric" v-html="wind_speed"></span>
          <span v-if="type === 'humidity'" class="metric" v-html="humidity"></span>
        </p>

        <p class="weather__chart-city">{{ currentLocation.city }}</p>
        <p class="weather__chart-type">{{ formatTitle(type) }}</p>
        <p class="weather__chart-date">{{ currentWeatherDate }}</p>
        <p class="weather__chart-time">{{ currentWeatherTime }}</p>
      </div>

      <div class="chart-container" style="position: relative; height: 10vh; width: 60vw">
        <canvas id="weather__chart-ref"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./chart";
export default Chart;
</script>

<style lang="scss" scoped>
@import "chart.scss";
</style>