<template>
  <div>
    <p @click="$emit('filter')">
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