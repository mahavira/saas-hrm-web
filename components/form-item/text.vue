<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>
