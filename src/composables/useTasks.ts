import type { Task } from '@/types'
import { computed, onMounted, ref, watch } from 'vue'

export function useTasks() {
  const tasks = ref<Task[]>([])
  const STORAGE_KEY = 'tasks'

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

  const editTask = (id: string, newTitle: string) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.title = newTitle
    }
  }

  // Persistencia
  onMounted(() => {
    try {
      const save = localStorage.getItem(STORAGE_KEY)
      if (save) {
        const parsed = JSON.parse(save)
        if (Array.isArray(parsed)) {
          tasks.value = parsed
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      localStorage.removeItem(STORAGE_KEY)
    }
  })

  watch(
    tasks,
    (newTask) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTask))
    },
    { deep: true }
  )

  return {
    tasks,
    addTask,
    toggleDone,
    removeTask,
    totalDone,
    editTask,
  }
}
