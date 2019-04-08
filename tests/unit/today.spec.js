import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Today from '@/components/Today'
import weatherData from './mocks/today'

import createStateConfig from './createStateConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const stateConfig = createStateConfig()

const store = new Vuex.Store({
  state: stateConfig,
  mutations: {}
})

const $router = {
  push: jest.fn()
}

const wrapper = shallowMount(Today, {
  store,
  localVue,
  mocks: {
    $router
  }
})

describe('Today.vue', () => {
  beforeEach(() => {
    wrapper.vm.$store.state.isLoading = false
    wrapper.vm.$store.state.weatherData_weather = weatherData
    wrapper.vm.$store.state.location.city = 'Haarlem'
  })

  it('Snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Mount with initial state', () => {
    expect(wrapper.vm.title).toMatch('Today Weather')
    expect(wrapper.vm.$store.state.location.city).toBe('Haarlem')
    expect(wrapper.vm.$store.state.location.country).toBe('')
  })

  it('Start with correct UI', () => {
    // Exist and visible
    expect(wrapper.find('.today').isVisible()).toBe(true)
  })

  it('Can render condition', () => {
    expect(wrapper.find('.today__condition').text()).toMatch('mist')
  })

  it('Can render temperature', () => {
    // Temperature
    expect(wrapper.find('.today__temp .metric').text()).toMatch('℃')
    expect(wrapper.find('.today__temp strong').text()).toMatch('12.8')
  })

  it('Can render wind speed', () => {
    // Wind
    expect(wrapper.find('.today__wind .metric').text()).toMatch('km')
    expect(wrapper.find('.today__wind strong').text()).toMatch('3.6')
  })

  it('Can render humidity', () => {
    // Humidity
    expect(wrapper.find('.today__humidity .metric').text()).toMatch('%')
    expect(wrapper.find('.today__humidity strong').text()).toMatch('66')

    expect(wrapper.find('.today__img').isVisible()).toBe(true)
  })

  it('Can render weather icon', () => {
    expect(wrapper.find('.today__img').isVisible()).toBe(true)
  })
})
