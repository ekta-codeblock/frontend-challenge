<template>
  <!-- Header container with flex layout -->
  <div class="flex justify-between items-start mb-2">
    <div>
      <!-- Required title -->
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
      
      <!-- Optional description (only shown if provided) -->
      <p v-if="description" class="text-sm text-gray-500 mt-1">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props for the Header component
defineProps<{
  title: string           // Required title text
  description?: string    // Optional description text
}>()
</script>
