<script setup lang="ts">
  import { ref } from 'vue'

  const newTask = ref('')
  const fromSubmitted = () => {
    console.log(newTask.value)
  }
</script>

<template>
  <form @submit.prevent="fromSubmitted">
    <label>
      New Task
      <input
        v-model="newTask"
        name="newTask"
      />
    </label>
    <div class="button-container">
      <button>Add</button>
    </div>
  </form>
</template>

<style scoped>
  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
