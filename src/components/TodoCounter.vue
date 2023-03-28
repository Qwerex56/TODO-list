<template>
  <div class="todo-counter">
    <p class="todo-counter__items-left">
      {{ activeTodoCount }} items left
    </p>
    <p 
      class="todo-counter__clear-inactive"
      @click="$emit('removeInactive')"  
    >
      Clear Completed
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    activeTodoCount: {
      type: Number,
      required: true,
    }
  },
  emits: ['removeInactive'],
}
</script>

<style lang="scss">
@use '@/scss/variables' as *;

.todo-counter {
  display: flex;
  box-sizing: border-box;

  padding: 1.25rem;

  background: white;
  color: $dark-grayish-blue;

  font-family: $josefin-sans;
  font-size: 0.75rem;

  &__items-left {
    margin-right: auto;
  }

  &__clear-inactive {
    cursor: default;
    &:hover {
      color: $very-dark-grayish-blue;
    }
  }
}


</style>