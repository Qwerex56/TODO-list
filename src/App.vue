<template>
  <div style="background-color: red; display: flex;">
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