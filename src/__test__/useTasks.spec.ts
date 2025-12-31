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
      expect(tasks.value[0]!.title).toBe('My first task')
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

  //tooggleDone
  describe('toggleDone', () => {
    it('should mark task as done', () => {
      const { tasks, addTask, toggleDone } = withSetup(() => useTasks())

      addTask('Task 1')
      const taskId = tasks.value[0]!.id

      toggleDone(taskId)

      expect(tasks.value[0]!.done).toBe(true)
    })

    it('should unmark a task as done', () => {
      const { tasks, addTask, toggleDone } = withSetup(() => useTasks())

      addTask('Task unmark done')
      const taskId = tasks.value[0]!.id

      toggleDone(taskId)
      toggleDone(taskId)

      expect(tasks.value[0]!.done).toBe(false)
    })
  })

  // removeTask
  describe('removeTask', () => {
    it('should remove a task by id', () => {
      const { tasks, addTask, removeTask } = withSetup(() => useTasks())

      addTask('Task to be removed')
      const taskId = tasks.value[0]!.id

      removeTask(taskId)
      expect(tasks.value).toHaveLength(0)
    })

    it('should remove only te correct task', () => {
      const { tasks, addTask, removeTask } = withSetup(() => useTasks())

      addTask('Task 1 to stay')
      addTask('Task 2 to be removed')

      removeTask(tasks.value[1]!.id)

      expect(tasks.value).toHaveLength(1)
      expect(tasks.value[0]!.title).toBe('Task 1 to stay')
    })
  })

  // editTask
  describe('editTask', () => {
    it('should edit a task title', () => {
      const { tasks, addTask, editTask } = withSetup(() => useTasks())

      addTask('Task to be edited')
      const taskId = tasks.value[0]!.id

      editTask(taskId, 'Task has been edited')

      expect(tasks.value[0]!.title).toBe('Task has been edited')
    })

    it('should only change title, not other properties', () => {
      const { tasks, addTask, editTask } = withSetup(() => useTasks())

      addTask('Task to be edited')
      const taskId = tasks.value[0]!.id

      editTask(taskId, 'Task new title')

      expect(tasks.value[0]!.id).toBe(taskId)
      expect(tasks.value[0]!.done).toBe(false)
      expect(tasks.value[0]!.title).toBe('Task new title')
    })
  })

  // totalDone
  describe('totalDone', () => {
    it('should return the number of the tasks done', () => {
      const { tasks, addTask, toggleDone, totalDone } = withSetup(() => useTasks())

      addTask('Task one')
      addTask('Task two')
      addTask('Task three')

      const taskIdOne = tasks.value[0]!.id
      const taskIdTwo = tasks.value[1]!.id

      toggleDone(taskIdOne)
      toggleDone(taskIdTwo)

      expect(totalDone.value).toBe(2)
    })

    it('should return 0 when no tasks are done', () => {
      const { tasks, addTask, totalDone } = withSetup(() => useTasks())

      addTask('Task one')
      addTask('Task two')
      addTask('Task three')

      expect(tasks.value).toHaveLength(3)
      expect(totalDone.value).toBe(0)
    })
  })
})
