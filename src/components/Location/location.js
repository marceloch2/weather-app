import { mapState } from 'vuex'

import weatherApiService from '../../Services/weatherApiService'

export default {
  name: 'today',
  data() {
    return {
      title: 'Choose your location',
      city: '',
      country: '',
      hideCountry: false
    }
  },

  mounted() {
    this.$refs.locationForm.addEventListener('submit', event => {
      event.preventDefault()
      this.search()
    })
  },

  props: [ 'hasCountry' ],

  computed: mapState({
    location: state => state.location,
    tab: state => state.tab
  }),

  watch: {
    tab: function(_old, _new) {
      if (this.city !== '') {
        this.search()
      }
    },

    hasCountry: function(_old, _new) {
      this.hideCountry = !_new
    }
  },

  methods: {
    async search() {
      if (this.city === '') {
        return
      }

      let tab = this.$store.state.tab
      this.$store.commit('setIsLoading', true)

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

        this.$store.commit('setIsLoading', false)
        this.$store.commit('globalError', {
          msg: '',
          hasError: false
        })
      } catch (error) {
        this.$store.commit('setIsLoading', false)

        this.$store.commit('globalError', {
          msg: `No Weather data found for ${this.$store.state.location.city}`,
          hasError: true
        })
      }
    }
  }
}
