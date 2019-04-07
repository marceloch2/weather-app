import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    metric: '&#8451;',
    wind_speed: 'km',
    humidity: '%',
    tab: 'weather',
    globalError: {
      hasError: false,
      msg: ''
    },
    user: {
      username: '',
      hash: ''
    },
    location: {
      city: '',
      country: ''
    },
    weatherData_weather: [],
    weatherData_forecast: [],
    geo: {
      lat: 10,
      lng: 10
    }
  },
  mutations: {
    setIsLoading(state, val) {
      state.isLoading = val
    },

    setTabType(state, tab) {
      state.tab = tab
    },

    globalError(state, err) {
      state.globalError.msg = err.msg
      state.globalError.hasError = err.hasError

      setTimeout(() => {
        state.globalError.msg = ''
      }, 5000)
    },

    setUser(state, user) {
      state.user = user
    },

    setCurrentLocation(state, loc) {
      state.location.city = loc.city
      state.location.country = loc.country
    },

    setWeatherData(state, payload) {
      if (payload.tab === 'weather') {
        state.geo.lat = payload.weatherData.coord.lat
        state.geo.lng = payload.weatherData.coord.lon
      } else {
        state.geo.lat = payload.weatherData.city.coord.lat
        state.geo.lng = payload.weatherData.city.coord.lon
      }

      state[`weatherData_${payload.tab}`] = payload.weatherData
    },

    setGeo(state, geo) {
      state.geo = geo
    }
  },
  actions: {},
  plugins: [ createPersistedState() ]
})
