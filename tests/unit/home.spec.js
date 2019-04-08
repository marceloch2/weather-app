import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import Chart from '@/components/Chart'
import Location from '@/components/Location'
import Today from '@/components/Today'

import createStateConfig from './createStateConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const stateConfig = createStateConfig()

const store = new Vuex.Store({
  state: stateConfig,
  mutations: {
    setCurrentLocation: jest.fn(),
    globalError: jest.fn(),
    setTabType: jest.fn()
  }
})

const $router = {
  push: jest.fn()
}

const $session = {
  destroy: () => {
    window.localStorage.removeItem('vue-session-key')
  },
  start: () => jest.fn()
}

const wrapper = shallowMount(Home, {
  store,
  localVue,
  mocks: {
    $router,
    $session
  }
})

describe('Home.vue', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('Snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('To have Location component', () => {
    expect(wrapper.find(Location).exists()).toBe(true)
  })

  it('To have Chart component', () => {
    expect(wrapper.find(Chart).exists()).toBe(true)
  })

  it('To have Today component', () => {
    expect(wrapper.find(Today).exists()).toBe(true)
  })

  it('Mount with initial state', () => {
    expect(wrapper.vm.$store.state.globalError.msg).toBe('')
    expect(wrapper.vm.$store.state.globalError.hasError).toBe(false)
    expect(wrapper.vm.$store.state.location.city).toBe('')
    expect(wrapper.vm.$store.state.location.country).toBe('')
  })

  it('Start with correct UI', () => {
    expect(wrapper.find('.app__menu').isVisible()).toBe(true)
    expect(wrapper.find('.app__topbar').isVisible()).toBe(true)
    expect(wrapper.find('.home').isVisible()).toBe(true)
    expect(wrapper.find('.home__center').isVisible()).toBe(true)
    expect(wrapper.find('.home__center-right').isVisible()).toBe(true)
  })

  it('Can call Tabs method and change local state', () => {
    wrapper.vm.tabs('forecast')
    expect(wrapper.vm.activeTab).toMatch('forecast')
  })

  it('Can logout', () => {
    window.localStorage.setItem(
      'vue-session-key',
      JSON.stringify({
        jwt: 'e96f86f596aa58253a2f77eef125ec5e'
      })
    )

    const session = () => JSON.parse(window.localStorage.getItem('vue-session-key'))

    expect(session().jwt).toMatch('e96f86f596aa58253a2f77eef125ec5e')

    wrapper.vm.logout()

    expect(session()).toBeNull()
  })

  it('Can isLoading works', () => {
    expect(wrapper.html()).toContain('<div class="home__center-right-holder">')
    expect(wrapper.find('.home__center-right-holder').isVisible()).toBe(true)

    wrapper.vm.$store.state.isLoading = true
    expect(wrapper.html()).not.toContain('<div class="home__center-right-holder">')
  })

  it('Can Error toast works', () => {
    wrapper.vm.$store.state.globalError.hasError = true
    wrapper.vm.$store.state.isLoading = false
    expect(wrapper.html()).toContain('<div class="hasError">')
    expect(wrapper.find('.hasError span').text()).toMatch(':(')

    wrapper.vm.$store.state.globalError.hasError = false
    expect(wrapper.html()).not.toContain('<div class="hasError">')
  })
})
