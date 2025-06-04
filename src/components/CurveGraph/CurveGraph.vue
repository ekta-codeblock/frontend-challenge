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
    <Header :title="title" :description="description" />

    <svg
      height="200"
      width="300"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      class="p-1 rounded border"
      :style="{ backgroundColor }"
    >
      <path
        :d="smoothedPathData"
        :stroke="pathColor"
        fill="none"
        stroke-width="2"
      />
    </svg>

    <Slider v-model="percentageInput" :min-threshold="minThreshold" />
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

const percentageInput = ref(props.percentage)

watch(() => props.percentage, (newVal) => {
  percentageInput.value = newVal
})

const showWarning = computed(() =>
  props.minThreshold !== undefined ? percentageInput.value < props.minThreshold : false
)

const pathColor = computed(() =>
  showWarning.value ? '#ef4444' : '#66bf3c'
)

const backgroundColor = computed(() =>
  showWarning.value ? '#fee2e2' : '#e9ffde'
)

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
