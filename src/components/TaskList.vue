<script setup lang="ts">
  import type { Task } from '@/types'
  import { ref } from 'vue'

  const props = defineProps<{
    tasks: Task[]
  }>()

  const emits = defineEmits<{
    toggleDone: [id: string]
    removeTask: [id: string]
    editTask: [id: string, newTitle: string]
  }>()

  // Estado local para edición

  const editingId = ref<string | null>(null)
  const editText = ref('')
  const isCancelling = ref(false)

  const startEditing = (task: Task) => {
    editingId.value = task.id
    editText.value = task.title
    isCancelling.value = false
  }

  const isEditing = (id: string) => {
    return editingId.value === id
  }

  const saveEditing = (id: string) => {
    if (isCancelling.value) return

    if (editText.value.trim()) {
      emits('editTask', id, editText.value.trim())
    }
    cancelEdit()
  }

  const cancelEdit = () => {
    isCancelling.value = true
    editingId.value = null
    editText.value = ''
  }
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
      <label v-if="!isEditing(task.id)">
        <input
          type="checkbox"
          :checked="task.done"
          @input="emits('toggleDone', task.id)"
        />
        <!-- Modo lectura -->
        <span
          :class="{ done: task.done }"
          @dblclick="startEditing(task)"
          class="task-text"
        >
          {{ task.title }}
        </span>
      </label>
      <!-- Modo edición -->
      <input
        v-else
        v-model="editText"
        @blur="saveEditing(task.id)"
        @keyup.enter="saveEditing(task.id)"
        @keyup.escape="cancelEdit"
        class="edit-input"
        autofocus
      />
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
    gap: 1rem;
  }
  .edit-input {
    margin: 0;
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
