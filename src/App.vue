<script setup lang="ts">
  import { computed, ref } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'

  import type { Task, TaskFilter } from './types'
  import TaskList from '@/components/TaskList.vue'
  import FilterButton from '@/components/FilterButton.vue'

  const message = ref('Task App')
  const tasks = ref<Task[]>([])
  const filter = ref<TaskFilter>('all')

  const addTask = (newTask: string) => {
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false,
    })
  }

  const toggleDone = (id: string) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.done = !task.done
    }
  }

  const removeTask = (id: string) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  const totalDone = computed(() => {
    // Opción 1: con reduce
    // return tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)

    // Opción 2: con filter
    return tasks.value.filter((task) => task.done).length
  })

  const filterTasks = computed(() => {
    switch (filter.value) {
      case 'all':
        return tasks.value
      case 'done':
        return tasks.value.filter((task) => task.done)
      case 'todo':
        return tasks.value.filter((task) => !task.done)
    }
    return tasks.value
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
