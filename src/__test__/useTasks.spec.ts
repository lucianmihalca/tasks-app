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
    it('totalDone should be 0 when no tasks', () => {})
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

    it('new task should have corect structure', () => {
      const { tasks, addTask } = withSetup(() => useTasks())

      addTask('My task')
      const task = tasks.value[0]

      expect(task?.id).toBeDefined()
      expect(task?.title).toBe('My task')
      expect(task?.done).toBe(false)
    })

    it('should add multiple tasks', () => {
      const { tasks, addTask } = withSetup(() => useTasks())
      addTask('Task 1')
      addTask('Task 2')
      addTask('Task 3')
      expect(tasks.value).toHaveLength(3)
    })

    it('should not add a task if title is empty', () => {
      const { tasks, addTask } = withSetup(() => useTasks())

      addTask('')

      expect(tasks.value).toHaveLength(0)
    })

    it('each task should have a unique id', () => {
      const { tasks, addTask } = withSetup(() => useTasks())

      addTask('Task 1')
      addTask('Task 2')

      const taskOne = tasks.value[0]
      const taskTowo = tasks.value[1]

      expect(taskOne?.id).not.toBe(taskTowo?.id)
    })
  })
})
