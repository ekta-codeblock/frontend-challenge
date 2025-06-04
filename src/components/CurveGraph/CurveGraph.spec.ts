import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurveGraph from './CurveGraph.vue'
import HeaderDisplay from './Header.vue'
import PercentageSlider from './Slider.vue'

describe('CurveGraph', () => {
  it('renders properly with required props', () => {
    // Mount the component with required props
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 50,
        minThreshold: 20
      }
    })

    // Ensure subcomponents render correctly
    expect(wrapper.findComponent(HeaderDisplay).exists()).toBe(true)
    expect(wrapper.findComponent(PercentageSlider).exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('computes path color and background color based on threshold', async () => {
    // Mount with percentage below threshold
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 30,
        minThreshold: 40
      }
    })

    // Expect stroke to be warning red
    expect(wrapper.find('path').attributes('stroke')).toBe('#ef4444')
    // Expect background to be light red
    expect(wrapper.find('svg').attributes('style')).toContain('rgb(254, 226, 226)')

    // Update props to percentage above threshold
    await wrapper.setProps({ percentage: 50, minThreshold: 50 })

    // Expect stroke to switch to green
    expect(wrapper.find('path').attributes('stroke')).toBe('#66bf3c')
    // Expect background to switch to light green
    expect(wrapper.find('svg').attributes('style')).toContain('rgb(233, 255, 222)')
  })

  it('updates percentageInput when percentage prop changes', async () => {
    // Mount with initial percentage
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 30
      }
    })

    // Change prop value
    await wrapper.setProps({ percentage: 60, minThreshold: 50 })

    // Confirm internal prop has updated
    expect(wrapper.vm.percentage).toBe(60)
  })

  it('generates correct path data based on percentage', () => {
    // Mount with percentage 50
    const wrapper = mount(CurveGraph, {
      props: {
        title: 'Test Graph',
        percentage: 50
      }
    })

    // The SVG path should match this quadratic curve
    const expectedPath = 'M0,80 Q 50,20 100,80'
    expect(wrapper.find('path').attributes('d')).toBe(expectedPath)
  })
})
