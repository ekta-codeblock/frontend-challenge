<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import pkg from "../package.json"

</script>

<template>
   <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <div class="mx-auto max-w-3xl">
      <HelloWorld :msg="pkg.name" />
    </div>
  </div>

</template>

<style>
html, body {
  @reference "./style.css";
  @apply bg-slate-50;
}
</style>
