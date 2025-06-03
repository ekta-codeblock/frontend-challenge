<template>
    <div class="flex justify-between items-start mb-2">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
        <p v-if="description" class="text-sm text-gray-500 mt-1">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string
    description?: string
  }>()
  </script>
  