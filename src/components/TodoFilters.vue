<template>
  <div class="todo-filters">
    <FilterButton @filter="$emit('newFilter', activeFilter.ALL)">All</FilterButton>
    <FilterButton @filter="$emit('newFilter', activeFilter.ACTIVE)">Active</FilterButton>
    <FilterButton @filter="$emit('newFilter', activeFilter.COMPLETED)">Completed</FilterButton>
  </div>
</template>

<script lang="ts">
import FilterButton from './FilterButton.vue';
import FilterTypeEnum from '../modules/FilterEnum'

export default {
  components: {
    FilterButton,
  },
  emits: ['newFilter'],
  data() {
    return {
      activeFilter: FilterTypeEnum,
    }
  },
}
</script>

<style lang="scss">
  
</style>