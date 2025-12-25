import { describe, it, expect } from 'vitest'
import { useTasks } from '@/composables/useTasks'
import { withSetup } from './helpers'

describe('useTasks', () => {
  // initila state
  describe('initial state', () => {
    it('needs to start with an empty array', () => {
      const { tasks } = withSetup(() => useTasks())
      expect(tasks.value).toEqual([])
    })
  })
  //addTask
  describe('addTask', () => {
    it('should add a new task', () => {
      const { tasks, addTask } = withSetup(() => useTasks())
      addTask('My first task')

      // Verifica que hay 1 tarea
      expect(tasks.value).toHaveLength(1)

      // Verifica el título
      expect(tasks.value[0]?.title).toBe('My first task')
    })
  })
})
