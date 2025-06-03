import type { Meta, StoryObj } from '@storybook/vue3'
import CurveGraph from './CurveGraph.vue'

const meta = {
    title: 'Components/CurveGraph',
    component: CurveGraph,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        percentage: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        minThreshold: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    },
} satisfies Meta<typeof CurveGraph>

export default meta
type Story = StoryObj<typeof meta>

export const HighPerformance: Story = {
    args: {
        title: 'High Performance Metric',
        description: 'Shows the current performance level',
        percentage: 85,
        minThreshold: 60,
    },
}

export const MinThreshold: Story = {
    args: {
        title: 'Critical Metric',
        description: 'Current value is below threshold',
        percentage: 15,
        minThreshold: 20,
    },
}

export const LowPerformance: Story = {
    args: {
        title: 'Low Performance Metric',
        description: 'Shows the current performance level',
        percentage: 35,
        minThreshold: 30,
    },
}