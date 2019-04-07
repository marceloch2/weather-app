import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home, {
      propsData: {}
    })

    console.log(wrapper)

    // expect(wrapper.text()).toMatch(msg)
  })
})
