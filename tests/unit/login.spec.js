import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/components/Login'

import createStateConfig from './createStateConfig'

const localVue = createLocalVue()
localVue.use(Vuex)

const stateConfig = createStateConfig()

const store = new Vuex.Store({
  state: stateConfig,
  mutations: {
    setUser: jest.fn()
  }
})

const $router = {
  push: jest.fn()
}

const $session = {
  destroy: () => {
    window.localStorage.removeItem('vue-session-key')
  },
  start: () => jest.fn(),
  set: () => jest.fn()
}

const wrapper = shallowMount(Login, {
  store,
  localVue,
  mocks: {
    $router,
    $session
  }
})

describe('Login.vue', () => {
  beforeEach(() => {})

  it('Snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Can retrieve login information', () => {
    wrapper.vm.username = 'a'
    wrapper.vm.password = 'b'

    expect(wrapper.vm.getLoginData()).toEqual([])

    wrapper.vm.username = 'marceloch2@gmail.com'
    wrapper.vm.password = 'Demo12345'

    expect(wrapper.vm.getLoginData()[0]).toMatchObject({
      username: 'marceloch2@gmail.com',
      password: 'Demo12345'
    })
  })
})
