<template>
  <div>
    <TodoLabel v-for="todo in todos" :key="todo.id" :description="todo.description" @remove="removeTodo(todo)" />
  </div>
</template>

<script lang="ts">
import TodoLabel from './components/TodoLabel.vue';

export default {
  components: {
    TodoLabel,
  },
  data: () => {
    return {
      todos: [
        { id: 0, description: "hello szymczuk 1", isActive: true },
        { id: 1, description: "hello szymczuk 2", isActive: false },
        { id: 2, description: "hello szymczuk 3", isActive: false },
        { id: 3, description: "hello szymczuk 4", isActive: true },
        { id: 4, description: "hello szymczuk 5", isActive: false },
      ]
    }
  },
  methods: {
    removeTodo(todo: any) {
      this.todos = this.todos.filter((el) => el.id !== todo.id);
    }
  }
}
</script>