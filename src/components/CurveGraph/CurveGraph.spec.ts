import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurveGraph from './CurveGraph.vue'
import HeaderDisplay from './Header.vue'
import PercentageSlider from './Slider.vue'

describe('CurveGraph.vue', () => {
  it('renders required structure and subcomponents', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 50,
        minThreshold: 30,
      },
    })

    expect(wrapper.findComponent(HeaderDisplay).exists()).toBe(true)
    expect(wrapper.findComponent(PercentageSlider).exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Graph')
  })

  it('renders warning message correctly when below threshold', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Warning Test',
        percentage: 25,
        minThreshold: 30,
      },
    })
  
    const warningText = wrapper.find('text')
  
    expect(warningText.exists()).toBe(true)
    expect(warningText.text()).toBe('* The value is below 30%')
  })
  
  it('shows success color when percentage >= minThreshold', async () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Safe Test',
        percentage: 35,
        minThreshold: 30,
      },
    })

    const path = wrapper.find('path')
    const svg = wrapper.find('svg')

    expect(path.attributes('stroke')).toBe('#66bf3c')
    expect(svg.attributes('style')).toContain('background-color: rgb(233, 255, 222)') // #e9ffde
    expect(wrapper.text()).not.toContain('below')
  })

  it('updates internal model when prop changes', async () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Reactive Test',
        percentage: 40,
        minThreshold: 30,
      },
    })

    await wrapper.setProps({ percentage: 60 })
    expect((wrapper.vm as any).percentageInput).toBe(60)
  })

  it('computes SVG path correctly based on percentage', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Path Test',
        percentage: 50,
      },
    })

    const path = wrapper.find('path')
    expect(path.attributes('d')).toBe('M0,80 Q 50,20 100,80')
  })

  it('does not show warning if no minThreshold is provided', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'No Threshold',
        percentage: 10,
      },
    })

    expect(wrapper.text()).not.toContain('below')
    expect(wrapper.find('path').attributes('stroke')).toBe('#66bf3c')
  })
})
