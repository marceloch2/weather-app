import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Location from '@/components/Location'
import weatherData from './mocks/today'

import createStateConfig from './createStateConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const stateConfig = createStateConfig()

const store = new Vuex.Store({
  state: stateConfig,
  mutations: {
    setCurrentLocation: jest.fn(),
    globalError: jest.fn(),
    setWeatherData: jest.fn(),
    setIsLoading: jest.fn(),
    fetchWeather: jest.fn()
  }
})

const $router = {
  push: jest.fn()
}

const wrapper = shallowMount(Location, {
  store,
  localVue,
  mocks: {
    $router
  }
})

describe('Location.vue', () => {
  beforeEach(() => {})

  it('Snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Mount with initial state', () => {
    expect(wrapper.vm.title).toMatch('Choose your location')
    expect(wrapper.vm.city).toBe('')
    expect(wrapper.vm.country).toBe('')
    expect(wrapper.vm.hideCountry).toBe(false)
  })

  it('Can call Search', async () => {
    wrapper.vm.city = 'Haarlem'
    wrapper.vm.$store.state.isLoading = false
    wrapper.vm.$store.state.weatherData_weather = weatherData
    wrapper.vm.$store.state.location.city = 'Haarlem'

    expect(wrapper.vm.search()).toBeInstanceOf(Promise)
  })
})
