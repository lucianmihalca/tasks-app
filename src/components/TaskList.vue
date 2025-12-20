<script setup lang="ts">
  import type { Task } from '@/types'

  const props = defineProps<{
    tasks: Task[]
  }>()

  const emits = defineEmits<{
    toggleDone: [id: string]
    removeTask: [id: string]
  }>()
</script>

<template>
  <TransitionGroup
    name="task-list"
    tag="div"
  >
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
      <button
        @click="emits('removeTask', task.id)"
        class="outline"
      >
        Remove
      </button>
    </article>
  </TransitionGroup>
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
  .task-list-enter-active,
  .task-list-leave-active {
    transition: all 0.5s ease;
  }
  .task-list-enter-from,
  .task-list-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
</style>
