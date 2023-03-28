<template>
  <div class="filter-button">
    <p class="filter-button__name" @click="$emit('filter')">
      <slot>

      </slot>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['filter'],
}
</script>

<style lang="scss">
@use '@/scss/variables' as *;

.filter-button {
  color: $dark-grayish-blue;
  
  font-family: $josefin-sans;

}
</style>