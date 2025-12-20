<script setup lang="ts">
  import { computed, ref } from 'vue'
  import TaskForm from '@/components/TaskForm.vue'

  import type { Task } from './types'
  import TaskList from '@/components/TaskList.vue'

  const message = ref('Task App')
  const tasks = ref<Task[]>([])

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

  const totalDone = computed(() => {
    // Opción 1: con reduce
    // return tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)

    // Opción 2: con filter
    return tasks.value.filter((task) => task.done).length
  })
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="!tasks.length">Add a task to get started</h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks completed</h3>
    <TaskList
      :tasks="tasks"
      @toggle-done="toggleDone"
    />
  </main>
</template>

<style scoped>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
</style>
