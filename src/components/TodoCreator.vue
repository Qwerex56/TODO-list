<template>
  <div class="todo-creator">
    <input 
      @keyup.enter="(ev: any) => {
        $emit('createTodo', ev.target.value);
        ev.target.value = '';  
      }" 
      type="text" 
      class="todo-creator__input" 
      placeholder="Create new todo..."
    >
  </div>
</template>

<script lang="ts">
export default {
  emits: ['createTodo'],
}
</script>

<style scoped lang="scss">
@use '@/scss/variables' as *;
.todo-creator {
  box-sizing: border-box;
  padding: 1rem 1.25rem;

  background-color: white;
  border-radius: 0.313rem;

  font-family: $josefin-sans;
  font-size:  0.75rem;

  &__input {
    appearance: none;

    border: none;
    outline: none;

    color: $very-dark-grayish-blue;

    font-family: inherit;
    font-size: 1rem;
  }
}
</style>