<template>
  <TodoCreator
    @create-todo="createTodo"
  />
  <div>
    <TodoLabel
      v-for="todo in getFilteredTodos()" :key="todo.id"
      :id="todo.id"
      :description="todo.description"
      :is-active="todo.isActive"
      @remove="removeTodo"
      @change-state="changeState"
      @change-description="changeDescription"
    />
    <TodoCounter/>
  </div>
  <TodoFilters 
    @new-filter="setFilter"
  />
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

      this.todos.push(new TodoObject(nextId, newDescription, true));
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>