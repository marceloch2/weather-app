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
          {{ currentWeatherData }}
          <span
            v-if="type === 'wind_speed'"
            class="metric"
            v-html="wind_speed"
          ></span>
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
import { mapState } from "vuex";
import Chart from "chart.js";
import weatherApiService from "../Services/weatherApiService";

const weatherLineChart = null;

export default {
  data() {
    return {
      activeClass: "active",
      currentWeatherIcon: "",
      currentWeatherData: "",
      currentWeatherDate: "",
      currentWeatherTime: "",
      types: ["temperature", "wind_speed", "humidity"],
      type: "temperature",
      chartData: [],
      currentData: {
        temperature: [],
        humidity: [],
        wind_speed: [],
        labels: []
      }
    };
  },

  mounted() {
    this.resetData();
    this.renderChart();
    this.setData(true);
  },

  computed: mapState({
    currentLocation: state => state.location,
    weatherData: state => state.weatherData_forecast,
    metric: state => state.metric,
    wind_speed: state => state.wind_speed,
    humidity: state => state.humidity
  }),

  watch: {
    weatherData: function(_new, _old) {
      this.resetData();
      this.setData(true);
    }
  },

  methods: {
    formatTitle(title) {
      title = title.replace("_", " ");

      return title.charAt(0).toUpperCase() + title.slice(1);
    },

    changeType(type) {
      this.currentWeatherData = "";
      this.type = type;

      this.weatherLineChart.data.datasets[0].data = this.currentData[type];
      this.weatherLineChart.data.datasets[0].label = this.formatTitle(
        this.type
      );

      this.weatherLineChart.update();
    },

    async setData(updating = false) {
      let weatherResponse = this.weatherData;

      if (!weatherResponse) {
        throw new Error("Failed to load the weather app");
      } else if (!Object.keys(weatherResponse).length) return;

      weatherResponse.list.forEach((data, i) => {
        if (i === 0) {
          let currentID = data.weather[0];
          this.currentWeatherIcon = currentID.icon;
        }
        this.currentData.labels.push(data.dt_txt);
        this.currentData.temperature.push(data.main.temp);
        this.currentData.humidity.push(data.main.humidity);
        this.currentData.wind_speed.push(data.wind.speed);
      });

      this.weatherLineChart.data.datasets[0].data = this.currentData[this.type];
      this.weatherLineChart.data.datasets[0].label = this.formatTitle(
        this.type
      );

      this.weatherLineChart.update();
    },

    resetData() {
      this.currentData.labels = [];
      this.currentData.temperature = [];
      this.currentData.humidity = [];
      this.currentData.wind_speed = [];
      this.currentWeatherData = 0;
      this.currentWeatherIcon = "";
      this.currentWeatherData = "";
      this.currentWeatherDate = "";
      this.currentWeatherTime = "";
    },

    renderChart(chartData) {
      let _self = this,
        _currentDate;
      const ctx = document
        .getElementById("weather__chart-ref")
        .getContext("2d");

      Chart.defaults.global.defaultFontColor = "black";
      Chart.defaults.global.defaultFontSize = 16;

      const data = {
        labels: this.currentData.labels,
        datasets: [
          {
            label: this.formatTitle(this.type),
            fill: true,
            showTooltips: false,
            lineTension: 0.1,
            backgroundColor: "rgba(0, 100, 110, 0.8)",
            borderColor: "rgb(167, 105, 0)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "white",
            pointBackgroundColor: "black",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "brown",
            pointHoverBorderColor: "yellow",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: chartData || [],
            spanGaps: false
          }
        ]
      };

      var options = {
        responsive: true,
        // maintainAspectRatio: false,
        tooltips: {
          displayColors: false,
          enabled: false,

          custom: tooltipModel => {
            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || [];
              const bodyLines = tooltipModel.body.map(data => data.lines);

              if (titleLines[0]) {
                _currentDate = new Date(titleLines[0]);
                _self.currentWeatherData = parseFloat(
                  bodyLines[0][0].split(":")[1]
                ).toFixed(2);
                _self.currentWeatherDate = _currentDate.toDateString();
                _self.currentWeatherTime = _currentDate.toTimeString();
              }
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: "fahrenheit",
                fontSize: 12
              }
            }
          ]
        }
      };

      this.weatherLineChart = new Chart(ctx, {
        type: "line",
        data,
        options
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.weather__chart {
  display: flex;
  flex-flow: column;
  align-items: center;

  .weather__chart-content {
    width: 100%;
    display: flex;
    flex-flow: row;

    .weather__chart-info {
      width: 200px;

      p {
        margin: 0;
        padding: 5px;
      }

      .weather__chart-city {
        font-size: 2em;
        text-transform: uppercase;
      }

      .weather__chart-img {
        width: 100px;
      }

      .weather__chart-type {
        font-size: 1.6em;
      }

      .weather__chart-data {
        font-size: 3em;
      }
    }
  }

  .weather__chart-tool-wrapper {
    border: solid 1px rgba(0, 100, 110, 0.8);
    border-radius: 20px;
    margin: 10px;

    .weather__chart-tool {
      display: inline;
      padding: 10px;

      button {
        border: solid 1px rgba(0, 100, 110, 0.8);
        border-radius: 20px;
        padding: 5px 30px 5px 30px;
        cursor: pointer;
      }

      .active {
        background-color: rgba(0, 100, 110, 0.8);
        color: #fff;
      }
    }
  }

  h1 {
    text-align: center;
  }

  h2 {
    background-color: rgba(0, 100, 110, 0.8);
    height: 30px;
    color: #fff;
    padding: 10px;
  }

  button {
    margin: 5px;
  }
}
</style>