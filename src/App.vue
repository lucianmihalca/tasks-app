<script setup lang="ts">
  import { computed, ref } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'

  import type { TaskFilter } from './types'
  import TaskList from '@/components/TaskList.vue'
  import FilterButton from '@/components/FilterButton.vue'
  import { useTasks } from '@/composables/useTasks'

  const message = ref('Task App')
  const filter = ref<TaskFilter>('all')

  const { tasks, addTask, toggleDone, removeTask, totalDone, editTask } = useTasks()

  const filterTasks = computed(() => {
    switch (filter.value) {
      case 'all':
        return tasks.value
      case 'done':
        return tasks.value.filter((task) => task.done)
      case 'todo':
        return tasks.value.filter((task) => !task.done)
      default:
        return tasks.value
    }
  })

  const setFilter = (value: TaskFilter) => {
    filter.value = value
  }
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="!tasks.length">Add a task to get started</h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks completed</h3>
    <div
      v-if="tasks.length"
      class="button-container"
    >
      <FilterButton
        filter="all"
        @set-filter="setFilter"
        :currentFilter="filter"
      />
      <FilterButton
        filter="todo"
        @set-filter="setFilter"
        :currentFilter="filter"
      />
      <FilterButton
        filter="done"
        @set-filter="setFilter"
        :currentFilter="filter"
      />
    </div>
    <TaskList
      :tasks="filterTasks"
      @toggle-done="toggleDone"
      @remove-task="removeTask"
      @edit-task="editTask"
    />
  </main>
</template>

<style scoped>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
  .button-container {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
