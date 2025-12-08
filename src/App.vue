<script setup lang="ts">
  import { ref } from 'vue'

  const message = ref('Hellou World')
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
  </main>
</template>

<style scoped>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
</style>
