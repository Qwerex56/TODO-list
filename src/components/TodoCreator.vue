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
      autocomplete="off"
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
  padding: 0.875rem 1.25rem;

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
    font-size: 0.75rem;
  }

  .dark & {
    background-color: $very-dark-desturated-blue;
    
    &__input {
      color: $dark-grayish-blue-dark;
      background-color: $very-dark-desturated-blue;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      padding: 1.25rem 1.5rem;

      font-size: 1.125rem;

      &__input {
        font-size: 1.125rem;
      }
    }
  }
}
</style>