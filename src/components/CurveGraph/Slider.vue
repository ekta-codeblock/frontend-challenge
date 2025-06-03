<template>
    <div class=" mt-6">
        <label class="block">
            <input v-model="localValue" type="range" min="0" max="100" step="1" class="w-full slider"
                :class="{ 'slider-danger': localValue < threshold }" :aria-valuemin="0" :aria-valuemax="100"
                :aria-valuenow="localValue" aria-label="Percentage slider" title="Adjust percentage" role="slider"
                ref="rangeInput" @input="updateTooltipPosition" />

            <div :style="{ left: tooltipLeft + 'px' }"
                style="position: absolute; background-color: black; color: white; border-radius: 4px; font-size: 12px; padding: 2px 2px; margin-top: 5px;">
                {{ localValue }}%
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps<{
    modelValue: number
    threshold: number
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
const rangeInput = ref<HTMLInputElement | null>(null)
const tooltipLeft = ref(0)

watch(() => props.modelValue, (val) => {
    localValue.value = val
})

watch(localValue, (val) => {
    emit('update:modelValue', val)
    updateTooltipPosition()
})

const updateTooltipPosition = () => {
    if (!rangeInput.value) return
    const input = rangeInput.value
    const percent = (localValue.value - Number(input.min)) / (Number(input.max) - Number(input.min))
    const width = input.offsetWidth
    const thumbWidth = 16
    tooltipLeft.value = percent * (width - thumbWidth) + thumbWidth / 2
}

onMounted(() => {
    nextTick(updateTooltipPosition)
})
</script>

<style scoped>
.slider {
    -webkit-appearance: none;
    width: 50%;
    height: 6px;
    background: #c3e8be;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s ease;
}

.slider.slider-danger {
    background: #f87171;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
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
