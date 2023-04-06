<template>
  <div class="todo-label">
    <input 
      @click="$emit('changeState', todo.id)" 
      type="checkbox"
      class="todo-label__check"
      :checked="!todo.isActive"
    >
    <p 
      v-if="isNewDescription" 
      @click="switchInput()" 
      :class="{'todo-label__description--completed': !todo.isActive}" 
      class="todo-label__description"
    >
      {{ todo.description }}
    </p>
    <input
      v-if="!isNewDescription"
      @keydown.enter="(ev: any) => {
        $emit('changeDescription', ev.target.value, todo.id);
        switchInput();
      }" 
      :value="todo.description" 
      type="text" 
      class="todo-label__input"
    >
    <img 
      @click="$emit('remove', todo.id)" 
      src="@/assets/images/icon-cross.svg" 
      alt="" 
      class="todo-label__delete"
    >
  </div>
</template>

<script lang="ts">
import TodoObject from '@/modules/TodoObject';

export default {
  props: {
    todo: {
      type: TodoObject,
      required: true,
    },
  },
  data() {
    return {
      isNewDescription: true,
    }
  },
  methods: {
    switchInput() {
      this.isNewDescription = !this.isNewDescription;
    },
  },
  emits: ['remove', 'changeState', 'changeDescription'],
}
</script>

<style scoped lang="scss">
@use '@/scss/variables' as *;

.todo-label {
  $border-width: 0.125rem;
  
  display: flex;
  align-items: center;
  box-sizing: border-box;

  padding: 1rem 1.25rem;

  border-bottom: 0.0625rem solid $very-light-grayish-blue;

  background-color: white;
  color: $very-dark-grayish-blue;

  font-family: $josefin-sans;
  font-size: 0.75rem;

  transition: 0.3s;

  &__check {
    appearance: none;

    position: relative;
    
    width: 1.25rem;
    height: 1.25rem;

    border: $border-width solid $dark-grayish-blue;

    background-clip: padding-box;
    background-color: $very-light-gray;
    border-radius: 50%;
    
    &:not(:checked):hover {
      border: none;
      @include check-background-gradient;

      &::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        
        margin: .1rem;
        
        border-radius: inherit;

        background-color: $very-light-gray;
      }
    }
    &:checked {
      position: relative;

      border: none;
      
      @include check-background-gradient;
      
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        content: url('@/assets/images/icon-check.svg');
      }
      &::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        
        margin: -.1rem;
        
        border-radius: inherit;
        @include check-background-gradient;
      }
    }
  }

  &__description {
    margin-left: 0.75rem;
    margin-right: auto;

    vertical-align: middle;
    background: transparent;
    
    &--completed {
      color: $light-grayish-blue;
  
      text-decoration: line-through;
    }
  }

  &__input {
    appearance: none;;

    margin-left: 0.75rem;
    margin-right: auto;

    border: none;
    outline: none;

    background-color: transparent;
    color: inherit;

    font-family: $josefin-sans;
    font-size: 0.75rem;
    vertical-align: middle;
  }

  &__delete {
    justify-self: flex-end;

    width: 0.75rem;
  }

  .dark & {
    border-bottom: 0.0625rem solid $very-dark-grayish-blue2-dark;

    background-color: $very-dark-desturated-blue;
    color: $light-grayish-blue;

    &__check {
      background-color: $very-dark-desturated-blue;

      border: $border-width solid $very-dark-grayish-blue2-dark;

      &:not(:checked):hover::before {
        background-color: $very-dark-desturated-blue;
      }
    }

    &__description {
      &--completed {
        color: $very-dark-grayish-blue-dark;
      }
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