import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import mutations from "./Store/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    metric: "&#8451;",
    wind_speed: "km",
    humidity: "%",
    tab: "weather",
    globalError: {
      hasError: false,
      msg: ""
    },
    user: {
      username: "",
      hash: ""
    },
    location: {
      city: "",
      country: ""
    },
    weatherData_weather: [],
    weatherData_forecast: [],
    geo: {
      lat: 10,
      lng: 10
    }
  },
  mutations,
  actions: {},
  plugins: [createPersistedState()]
});
