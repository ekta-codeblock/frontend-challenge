<template>
  <div class="mt-6 relative w-full">
    <label class="block">
      <!-- Input range bound to localValue and styled dynamically -->
      <input
        :value="localValue"
        @input="onInput"
        type="range"
        min="0"
        max="100"
        step="1"
        class="w-full slider"
        :class="{ 'slider-danger': localValue < minThreshold }"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="localValue"
        aria-label="Percentage slider"
        title="Adjust percentage"
        role="slider"
        ref="rangeInput"
      />

      <!-- Tooltip showing the current value, positioned based on thumb -->
      <div
        :style="{ left: tooltipLeft + 'px' }"
        class="absolute bg-black text-white rounded text-xs px-1 py-0.5 mt-1"
      >
        {{ localValue }}%
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

// Props: modelValue for v-model binding, minThreshold to trigger warning styling
const props = defineProps<{
  modelValue: number
  minThreshold: number
}>()

// Emits v-model update
const emit = defineEmits(['update:modelValue'])

// Local reactive copy of modelValue
const localValue = ref(Number(props.modelValue))

// Ref for the range input element
const rangeInput = ref<HTMLInputElement | null>(null)

// Tooltip position in pixels from the left
const tooltipLeft = ref(0)

// Sync internal value when prop changes externally
watch(() => props.modelValue, (val) => {
  localValue.value = Number(val)
  nextTick(updateTooltipPosition)
})

// Handler for input events
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = Number(target.value)
  localValue.value = newValue
  emit('update:modelValue', newValue)
  updateTooltipPosition()
}

// Calculates and sets tooltip position based on thumb location
const updateTooltipPosition = () => {
  if (!rangeInput.value) return

  const input = rangeInput.value
  const percent =
    (localValue.value - Number(input.min)) /
    (Number(input.max) - Number(input.min))

  const width = input.offsetWidth
  const thumbWidth = 16
  tooltipLeft.value = percent * (width - thumbWidth) + thumbWidth / 2

  // Update custom CSS property for slider fill percentage
  input.style.setProperty('--slider-percent', `${percent * 100}%`)
}

// Initialize tooltip position after component mounts
onMounted(() => {
  nextTick(updateTooltipPosition)
})
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 300px;
  height: 6px;
  border-radius: 5px;
  outline: none;
  background: linear-gradient(
    to right,
    #95db75 0%,
    #b6e0a2 var(--slider-percent),
    #1d4d17 var(--slider-percent),
    #164110 100%
  );
  transition: background 0.3s ease;
}

.slider.slider-danger {
  background: linear-gradient(
    to right,
    #f87171 0%,
    #f87171 var(--slider-percent),
    #7f1d1d var(--slider-percent),
    #7f1d1d 100%
  );
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 14px;
  width: 14px;
  border-radius: 10%;
  background: #66bf3c;
  cursor: pointer;
  position: relative;
  z-index: 10;
}

.slider.slider-danger::-webkit-slider-thumb {
  background: #dc2626;
}
</style>
