<script setup lang="ts">
  import { ref } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'
  const message = ref('Task App')
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm />
  </main>
</template>

<style scoped>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
</style>
