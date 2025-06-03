import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurveGraph from './CurveGraph.vue'
import HeaderDisplay from './Header.vue'
import PercentageSlider from './Slider.vue'

describe('CurveGraph', () => {
  it('renders properly with required props', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 50,
        minThreshold: 20
      }
    })
    expect(wrapper.findComponent(HeaderDisplay).exists()).toBe(true)
    expect(wrapper.findComponent(PercentageSlider).exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('computes path color and background color based on threshold', async () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 30,
        minThreshold: 40
      }
    })

    // Below threshold - should show warning colors
    expect(wrapper.find('path').attributes('stroke')).toBe('#ef4444')
    expect(wrapper.find('svg').attributes('style')).toContain('rgb(254, 226, 226)')

    // Update percentage to above threshold
    await wrapper.setProps({ percentage: 50, minThreshold: 50 })
    expect(wrapper.find('path').attributes('stroke')).toBe('#66bf3c')
    expect(wrapper.find('svg').attributes('style')).toContain('rgb(233, 255, 222)')
  })

  it('updates percentageInput when percentage prop changes', async () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 30
      }
    })

    await wrapper.setProps({ percentage: 60, minThreshold: 50 })
    expect(wrapper.vm.percentage).toBe(60)
  })

  it('generates correct path data based on percentage', () => {
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 50
      }
    })

    const expectedPath = 'M0,80 Q 50,20 100,80'
    expect(wrapper.find('path').attributes('d')).toBe(expectedPath)
  })
})