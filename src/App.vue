<template>
  <main 
    class="todo-list"
    :class="{'dark': isDarkMode}"
  >
    <div class="todo-list__style-switch">
      <p class="todo-list__style-switch__heading">TODO</p>
      <img 
        class="todo-list__style-switch__button" 
        :src="getModeLogo"
        alt="Switch Style"
        @click="switchLightDarkMode"
      >
    </div>
    <div class="todo-list__app">
      <TodoList/>
    </div>
  </main>
</template>

<script lang="ts">
import TodoList from './components/TodoList.vue';
import moonsvg from '@/assets/images/icon-moon.svg';
import sunsvg from '@/assets/images/icon-sun.svg';

export default {
  components: {
    TodoList,
  },
  data() {
    return {
      isDarkMode: false,
    }
  },
  computed: {
    getModeLogo() {
      let logo: string;
      if (this.isDarkMode) {
        logo = sunsvg;
      }
      else {
        logo = moonsvg;
      }
      return logo;
    }
  },
  methods: {
    switchLightDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  }
}
</script>

<style scoped lang="scss">
@use './scss/variables' as *;

.todo-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;

  height: 100vh;

  background-color: $very-light-gray;
  color: white;
  background-image: url('@/assets/images/bg-mobile-light.jpg');
  background-size: contain;
  background-repeat: no-repeat;

  font-family: $josefin-sans;

  &__style-switch {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 87.2%;
    padding-top: 1.25rem;
    padding-bottom: 2.5rem;

    margin-top: 1.25rem;

    font-size: 1.25rem;
    font-weight: 700;

    &__heading {  
      margin-right: auto;
      letter-spacing: 0.5rem;
    }

    &__button {
      margin-left: auto;
      width: 1.25rem;
      height: 1.25rem;
    }

    @media screen and (min-width: 768px) {
      & {
        max-width: 540px;

        padding-top: 2.5rem;
        padding-bottom: 3rem;

        font-size: 2.5rem;

        &__button {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
    }
  }

  &__app {
    width: 100%;
  }

  @media screen and (min-width: 440px) {
    & {
      background-image: url('@/assets/images/bg-desktop-light.jpg');
    }
  }

  &.dark {
    background-color: $very-dark-blue;
    background-image: url('@/assets/images/bg-mobile-dark.jpg');

    @media screen and (min-width: 440px) {
      & {
        background-image: url('@/assets/images/bg-desktop-dark.jpg');
      }
    }
  }
  
}
</style>