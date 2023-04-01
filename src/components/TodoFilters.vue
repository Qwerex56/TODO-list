<template>
  <div class="todo-filters">
    <input 
      class="todo-filters__input" type="radio" 
      @click="$emit('newFilter', activeFilter.ALL)" 
      name="setFilter" :id="activeFilter.ALL"
      checked
    >
    <label class="todo-filters__input--label" :for="activeFilter.ALL">All</label>
    <input 
      class="todo-filters__input" type="radio" 
      @click="$emit('newFilter', activeFilter.ACTIVE)" 
      name="setFilter" :id="activeFilter.ACTIVE"
    >
    <label class="todo-filters__input--label" :for="activeFilter.ACTIVE">Active</label>
    <input 
      class="todo-filters__input" type="radio" 
      @click="$emit('newFilter', activeFilter.COMPLETED)" 
      name="setFilter" :id="activeFilter.COMPLETED"
    >
    <label class="todo-filters__input--label" :for="activeFilter.COMPLETED">Completed</label>
  </div>
</template>

<script lang="ts">
import FilterTypeEnum from '../modules/FilterEnum'

export default {
  emits: ['newFilter'],
  data() {
    return {
      activeFilter: FilterTypeEnum,
    }
  },
}
</script>

<style lang="scss">
@use '@/scss/variables' as *;

.todo-filters {
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  padding: 1rem;

  border-radius: 0.313rem;

  background-color: white;

  &__input {
    position: absolute;
    appearance: none;

    &--label {
      color: $dark-grayish-blue;
      padding: 0rem 1.125rem;

      font-family: $josefin-sans;
      font-weight: 700;
    }

    &:checked + &--label {
      color: $bright-blue;
    }

    &:not(:checked):hover + &--label {
      color: $very-dark-grayish-blue;
    }
  }

  .dark & {
    background-color: $very-dark-desturated-blue;

    &__input {
      &--label {
        color: $dark-grayish-blue-dark;
      }

      &:checked + &--label {
        color: $bright-blue;
      }

      &:not(:checked):hover + &--label {
        color: $very-light-grayish-blue;
      }
    }
  }

  @media screen and (min-width: 768px) {
    & {
      max-width: 440px;

      &__input--label {
        padding: 0rem 0.5625rem;
      }
    }
  }
}
</style>