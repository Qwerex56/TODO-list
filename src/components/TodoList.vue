<template>
  <div>
    <TodoCreator
      @create-todo="createTodo"
    />
    <TodoLabel
      v-for="todo in todos" :key="todo.id"
      :id="todo.id"
      :description="todo.description"
      :is-active="todo.isActive"
      @remove="removeTodo(todo.id)"
      @change-state="changeState(todo.id)"
      @change-description="changeDescription"
    />
  </div>
</template>

<script lang="ts">
import TodoCreator from './TodoCreator.vue';
import TodoLabel from './TodoLabel.vue';

export default {
  components: {
    TodoCreator,
    TodoLabel,
  },
  data() {
    return {
      todos: [
        {id: 0, description: "My first task!", isActive: true},
      ]
    }
  },
  methods: {
    createTodo(newDescription: string) {
      const nextId = ((): number => {
        if (this.todos.length === 0) {
          return 0;
        }
        let max = this.todos[0].id;
        this.todos.forEach(element => {
          if (max <= element.id) {
            max = element.id
          }
        });
        return max + 1;
      })();

      this.todos.push({
        id: nextId,
        description: newDescription,
        isActive: true,
      });
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((el) => el.id !== id);
    },
    changeState(id: number) {
      const index = this.todos.findIndex((el) => el.id === id);
      this.todos[index].isActive = !this.todos[index].isActive;
    },
    changeDescription(newDescription: string, id: number) {
      const index = this.todos.findIndex((el) => el.id === id);
      const newTodo = {
        id: id,
        description: newDescription,
        isActive: this.todos[index].isActive,
      }

      this.todos[index] = newTodo;
    },
  }
}
</script>

<style scoped lang="scss">
</style>