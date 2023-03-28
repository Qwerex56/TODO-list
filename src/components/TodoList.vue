<template>
  <main class="todo-app">
    <TodoCreator
      @create-todo="createTodo"
    />
    <section class="todo-app__list">
      <TodoLabel
        v-for="todo in getFilteredTodos()" :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
        @change-state="changeState"
        @change-description="changeDescription"
      />
      <TodoCounter 
        :active-todo-count="countActiveTodos()"
        @remove-inactive="removeInactive()"
      />
    </section>
    <TodoFilters 
      @new-filter="setFilter"
    />
  </main>
</template>

<script lang="ts">
import TodoCreator from './TodoCreator.vue';
import TodoLabel from './TodoLabel.vue';
import TodoCounter from './TodoCounter.vue';
import TodoFilters from './TodoFilters.vue';

import TodoObject from '@/modules/TodoObject'
import FilterTypeEnum from '@/modules/FilterEnum';

export default {
  components: {
    TodoCreator,
    TodoLabel,
    TodoCounter,
    TodoFilters,
  },
  data() {
    return {
      todos: [
        new TodoObject(0, 'My first task!', true),
      ],
      filterEnum: FilterTypeEnum,
      activeFilter: FilterTypeEnum.ALL,
    }
  },
  methods: {
    createTodo(newDescription: string) {
      const nextId = ((): number => {
        if (this.todos.length === 0) {
          return 0;
        }
        let max = this.todos[0].id;
        this.todos.forEach(el => {
          if (max <= el.id) {
            max = el.id
          }
        });
        return max + 1;
      })();
      if (newDescription.length === 0) {
        return;
      }
      this.todos.push(new TodoObject(nextId, newDescription, true));
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((el) => el.id !== id);
    },

    removeInactive() {
      this.todos = this.todos.filter((el) => el.isActive === true);
    },

    changeState(id: number) {
      const index = this.todos.findIndex((el) => el.id === id);
      this.todos[index].isActive = !this.todos[index].isActive;
    },

    changeDescription(newDescription: string, id: number) {
      const index = this.todos.findIndex((el) => el.id === id);

      this.todos[index].description = newDescription;
    },

    setFilter(newFilter: FilterTypeEnum) {
      this.activeFilter = newFilter;
    },

    getFilteredTodos(): Array<TodoObject> {
      let filteredTodos: Array<TodoObject>;
      switch (this.activeFilter) {
        case this.filterEnum.ALL:
          filteredTodos = this.todos;
          break
        case this.filterEnum.ACTIVE:
          filteredTodos = this.todos.filter((el) => el.isActive === true);
          break;
        case this.filterEnum.COMPLETED:
          filteredTodos = this.todos.filter((el) => el.isActive === false);
          break;
      }
      return filteredTodos;
    },

    countActiveTodos(): number {
      const count = this.todos.filter((el) => el.isActive === true).length;
      return count;
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/scss/variables' as *;

.todo-app {
  width: 87.2%;

  margin: auto;

  &__list {
    overflow: hidden;
    margin-top: 1rem;
    margin-bottom: 1rem;

    border-radius: 0.313rem;
  }
}
</style>