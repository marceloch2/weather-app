import { mapState } from 'vuex'

export default {
  name: 'today',
  data() {
    return {
      title: 'weather today',
      city: '',
      country: ''
    }
  },

  mounted() {},

  computed: mapState({
    location: state => state.location,
    weatherData: state => state.weatherData_weather,
    metric: state => state.metric,
    wind_speed: state => state.wind_speed,
    humidity: state => state.humidity,
    hasError: state => state.globalError.hasError
  }),

  watch: {
    weatherData: function() {}
  },

  methods: {}
}
