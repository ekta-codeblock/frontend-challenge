<template>
  <!--
    CurveGraph Component
    -------------------
    Props:
      - title (string, required): Title for the graph header
      - description (string, optional): Description for the graph
      - percentage (number, required): Controls the curve's peak position (0-100)
      - minThreshold (number, optional): Minimum threshold for warning state
    Emits:
      - (none)
    Slots:
      - (none)
    Usage Example:
      <CurveGraph title="Performance" :percentage="75" :minThreshold="60" />
  -->
  <div class="bg-white border rounded-lg shadow p-4 w-full max-w-sm">
    <!-- Header with title and optional description -->
    <Header :title="title" :description="description" />

    <!-- SVG Curve Graph -->
    <svg
      height="200"
      width="300"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      class="p-1 rounded border"
      :style="{ backgroundColor }"
    >
      <!-- Render the smoothed curve path -->
      <path
        :d="smoothedPathData"
        :stroke="pathColor"
        fill="none"
        stroke-width="2"
      />

      <!-- Warning message displayed inside the SVG at the bottom -->
      <text
        v-if="showWarning"
        x="50"
        y="95"
        text-anchor="end"
        dominant-baseline="middle"
        fill="#b91c1c"
        font-size="4"
        font-style="italic"
      >
      {{ warningMessage }}
      </text>
    </svg>
    <!-- Interactive slider bound to percentageInput -->
    <Slider
      v-model:modelValue="percentageInput"
      :min-threshold="minThreshold"
      :style="{ accentColor: sliderColor }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Header from './Header.vue'
import Slider from './Slider.vue'

/**
 * Props for CurveGraph
 * @prop {string} title - Title for the graph header (required)
 * @prop {string} [description] - Description for the graph
 * @prop {number} percentage - Controls the curve's peak position (required)
 * @prop {number} [minThreshold] - Minimum threshold for warning state
 */
const props = defineProps<{
  title: string
  description?: string
  percentage: number
  minThreshold?: number
}>()

// Internal reactive model for the slider input
const percentageInput = ref(props.percentage)

// Sync local model with prop if it changes from the parent
watch(() => props.percentage, (newVal) => {
  percentageInput.value = newVal
})

// Show warning if the value is below the minimum threshold
const showWarning = computed(() =>
  props.minThreshold !== undefined ? Number(percentageInput.value) < Number(props.minThreshold) : false
)

// Show warning message if the value is below the minimum threshold
const warningMessage = computed(() =>
  showWarning.value? `* The Value is below ${props.minThreshold}` : ''
)
// Stroke color of the curve: red if below threshold, green otherwise
const pathColor = computed(() =>
  showWarning.value ? '#ef4444' : '#66bf3c'
)

// Background color of SVG based on warning state
const backgroundColor = computed(() =>
  showWarning.value ? '#fee2e2' : '#e9ffde'
)

// Slider color changes from red to dark red depending on the value
const sliderColor = computed(() => {
  return showWarning.value ? '#ef4444' : '#7f1d1d'
})

// Generates a smooth quadratic Bézier curve from left to right with a peak controlled by percentageInput
const smoothedPathData = computed(() => {
  const xStart = 0
  const yStart = 80
  const xEnd = 100
  const yEnd = 80
  const peakX = percentageInput.value
  const peakY = 20
  return `M${xStart},${yStart} Q ${peakX},${peakY} ${xEnd},${yEnd}`
})
</script>
