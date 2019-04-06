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
    metric: state => state.metric
  }),

  watch: {
    weatherData: function() {}
  },

  methods: {}
}
