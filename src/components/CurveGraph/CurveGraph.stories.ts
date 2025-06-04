import type { Meta, StoryObj } from "@storybook/vue3-vite";
import CurveGraph from "./CurveGraph.vue";

/**
 * CurveGraph Storybook Documentation
 * ----------------------------------
 * Props:
 *  - title (string): Title for the graph header
 *  - description (string): Description for the graph
 *  - percentage (number): Controls the curve's peak position (0-100)
 *  - minThreshold (number): Minimum threshold for warning state
 *
 * Usage Example:
 * ```vue
 * <CurveGraph title="Performance" :percentage="75" :minThreshold="60" />
 * ```
 */
const meta = {
  title: "Components/CurveGraph",
  component: CurveGraph,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Title for the graph header" },
    description: { control: "text", description: "Description for the graph" },
    percentage: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Controls the curve's peak position (0-100)",
    },
    minThreshold: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Minimum threshold for warning state",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A graph component for visualizing performance metrics with customizable thresholds. Adjust the props to see different curve behaviors.",
      },
    },
  },
} satisfies Meta<typeof CurveGraph>;

export default meta;

// Story type
type Story = StoryObj<typeof meta>;

/**
 * HighPerformance: Shows a curve with a high percentage above the threshold.
 */
export const HighPerformance: Story = {
  args: {
    title: "High Performance Metric",
    description: "Shows the current performance level",
    percentage: 85,
    minThreshold: 60,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The curve is green, indicating performance is above the threshold.",
      },
    },
  },
};

/**
 * MinThreshold: Shows a curve just below the minimum threshold.
 */
export const MinThreshold: Story = {
  args: {
    title: "Critical Metric",
    description: "Current value is below threshold",
    percentage: 15,
    minThreshold: 20,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The curve is red, indicating performance is below the threshold.",
      },
    },
  },
};

/**
 * LowPerformance: Shows a curve with a low percentage but above the threshold.
 */
export const LowPerformance: Story = {
  args: {
    title: "Low Performance Metric",
    description: "Shows the current performance level",
    percentage: 35,
    minThreshold: 30,
  },
  parameters: {
    docs: {
      description: {
        story: "The curve is green, but close to the threshold.",
      },
    },
  },
};
