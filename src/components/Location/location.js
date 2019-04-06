import { mapState } from 'vuex'

import weatherApiService from '../../Services/weatherApiService'

export default {
  name: 'today',
  data() {
    return {
      title: 'Choose your location',
      city: '',
      country: ''
    }
  },

  mounted() {},

  computed: mapState({
    location: state => state.location,
    tab: state => state.tab
  }),

  watch: {
    tab: function(_old, _new) {
      if (this.location.city !== '') {
        this.search()
      }
    }
  },

  methods: {
    async search() {
      let tab = this.$store.state.tab

      this.$store.commit('setCurrentLocation', {
        city: this.city,
        country: this.country
      })

      try {
        let weatherData = await weatherApiService.fetchWeather(
          this.$store.state.location.city,
          this.$store.state.location.country,
          tab
        )
        this.$store.commit('setWeatherData', {
          weatherData,
          tab
        })
      } catch (error) {
        this.$store.commit(
          'globalError',
          `No Weather data found for ${this.$store.state.location.city}`
        )
      }
    }
  }
}
