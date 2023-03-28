<template>
  <div style="background-color: red;">
    <TodoList/>
  </div>
</template>

<script lang="ts">
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
}
</script>