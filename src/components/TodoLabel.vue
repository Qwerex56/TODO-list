<template>
  <div class="todo-label">
    <input 
      @click="$emit('changeState', id)" 
      type="checkbox"
      class="todo-label__check"
    >
    <p 
      v-if="isNewDescription" 
      @click="switchInput()" 
      :class="{'todo-label__description--completed': !isActive}" 
      class="todo-label__description"
    >
      {{ description }}
    </p>
    <input
      v-if="!isNewDescription"
      @keydown.enter="(ev: any) => {
        $emit('changeDescription', ev.target.value, id);
        switchInput();
      }" 
      :value="description" 
      type="text" 
      class="todo-label__input"
    >
    <img 
      @click="$emit('remove', id)" 
      src="@/assets/images/icon-cross.svg" 
      alt="" 
      class="todo-label__delete"
    >
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
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
  display: flex;
  align-items: center;
  box-sizing: border-box;

  padding: 1rem 1.25rem;

  background-color: white;
  color: $very-dark-grayish-blue;

  font-family: $josefin-sans;
  font-size: 0.75rem;


  &__check {
    $border-width: 0.125rem;
    appearance: none;

    position: relative;
    
    width: 1.25rem;
    height: 1.25rem;

    border: $border-width solid $dark-grayish-blue;
    
    background-clip: padding-box;
    background-color: $very-light-gray;
    border-radius: 50%;
    
    &:not(:checked):hover {
      border: $border-width solid transparent;

      &::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        
        margin: -$border-width;
        
        border-radius: inherit;
        
        @include check-background-gradient;

        z-index: -1;
      }
    }
    &:checked {
      position: relative;

      border: 0px solid transparent;
      
      @include check-background-gradient;
      
      &::after {
        position: absolute;
        left: 25%; bottom: 12%;
        transform: position(0%, 0%);
        
        content: url('@/assets/images/icon-check.svg');
      }
    }
  }

  &__description {
    margin-left: 0.75rem;
    margin-right: auto;

    vertical-align: middle;
    
    &--completed {
      color: $dark-grayish-blue;
  
      text-decoration: line-through;
    }
  }

  &__input {
    appearance: none;;

    margin-left: 0.75rem;
    margin-right: auto;

    border: none;
    outline: none;

    color: inherit;

    font-size: inherit;
    vertical-align: middle;
  }

  &__delete {
    justify-self: flex-end;

    width: 0.75rem;
  }

}
</style>