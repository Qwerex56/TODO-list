<template>
  <main class="todo-app">
    <TodoCreator
      @create-todo="createTodo"
    />
    <section class="todo-app__list">
      <draggable
        v-model="filteredTodos"
        @start="drag=true"
        @end="drag=false"
        item-key="id"
      >
      <template #item="{element}">
        <TodoLabel 
          :todo="element"
          @change-description="changeDescription"
          @change-state="changeState"
          @remove="removeTodo"
        />
      </template>
      </draggable>
      <TodoCounter 
        :active-todo-count="countActiveTodos()"
        @remove-inactive="clearCompleted()"
      />
    </section>
    <TodoFilters
      class="todo-app__filters"
      @new-filter="setFilter"
    />
  </main>
</template>

<script lang="ts">
import TodoCreator from './TodoCreator.vue';
import TodoLabel from './TodoLabel.vue';
import TodoCounter from './TodoCounter.vue';
import TodoFilters from './TodoFilters.vue';
import draggable from 'vuedraggable';

import TodoObject from '@/modules/TodoObject'
import FilterTypeEnum from '@/modules/FilterEnum';

export default {
  components: {
    TodoCreator,
    TodoLabel,
    TodoCounter,
    TodoFilters,
    draggable,
  },
  data() {
    return {
      todos: new Array<TodoObject>,
      filteredTodos: new Array<TodoObject>, 
      filterEnum: FilterTypeEnum,
      activeFilter: FilterTypeEnum.ALL,
      drag: false,
    }
  },
  computed : {
    getFilteredTodos(): Array<TodoObject> {
      let filteredTodos: Array<TodoObject>;
      switch (this.activeFilter) {
        case this.filterEnum.ALL:
          filteredTodos = this.todos;
          break
        case this.filterEnum.ACTIVE:
          filteredTodos = this.todos.filter((el: TodoObject) => el.isActive === true);
          break;
        case this.filterEnum.COMPLETED:
          filteredTodos = this.todos.filter((el: TodoObject) => el.isActive === false);
          break;
      }
      return filteredTodos;
    },
  },
  methods: {
    createTodo(newDescription: string) {
      const nextId = ((): number => {
        if (this.todos.length === 0) {
          return 0;
        }
        const todo = this.todos[0] as TodoObject;
        let max = todo.id;
        this.todos.forEach((el: TodoObject) => {
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
      // this.filteredTodos = this.getFilteredTodos;
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((el: TodoObject) => el.id !== id);
      // this.filteredTodos = this.getFilteredTodos;
    },

    clearCompleted() {
      this.todos = this.todos.filter((el: TodoObject) => el.isActive === true);
      // this.filteredTodos = this.getFilteredTodos;
    },

    changeState(id: number) {
      const index = this.todos.findIndex((el: TodoObject) => el.id === id);
      this.todos[index].isActive = !this.todos[index].isActive;
      // this.filteredTodos = this.getFilteredTodos;
    },

    changeDescription(newDescription: string, id: number) {
      const index = this.todos.findIndex((el: TodoObject) => el.id === id);

      this.todos[index].description = newDescription;
      // this.filteredTodos = this.getFilteredTodos;
    },

    setFilter(newFilter: FilterTypeEnum) {
      this.activeFilter = newFilter;
      this.filteredTodos = this.getFilteredTodos;
    },

    countActiveTodos(): number {
      const count = this.todos.filter((el: TodoObject) => el.isActive === true).length;
      return count;
    },
  },
  watch: {
    todos: {
      handler(newVal) {
        this.filteredTodos = this.getFilteredTodos;
        console.log(newVal);
      },
      deep: true,
    },
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

  @media screen and (min-width: 768px) {
    & {
      width: 540px;

      margin-top: 1.5rem;
      
      &__filters {
        margin: auto;
        background-color: transparent;
        transform: translate(-1rem, -4rem);
      }
    }
  }
}
</style>