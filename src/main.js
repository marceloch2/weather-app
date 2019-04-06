import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import router from './Routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueSession, {
  persist: true
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAD25gpuNVulqqEWBFTKyUFyzcQGzy-HRo',
    libraries: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
