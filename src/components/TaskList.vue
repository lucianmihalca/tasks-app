<script setup lang="ts">
  import type { Task } from '@/types'

  const props = defineProps<{
    tasks: Task[]
  }>()

  const emits = defineEmits<{
    toggleDone: [id: string]
  }>()
</script>

<template>
  <article
    v-for="task in tasks"
    :key="task.id"
    class="task"
  >
    <label>
      <input
        type="checkbox"
        :checked="task.done"
        @input="emits('toggleDone', task.id)"
      />
      <span :class="{ done: task.done }">{{ task.title }}</span>
    </label>
    <button class="outline">Remove</button>
  </article>
</template>

<style scoped>
  .done {
    text-decoration: line-through;
  }
  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
