<template lang="pug">
div
  .sp-tabs__two(v-if="tabs.length")
    nuxt-link(
      v-for="(item, index) in tabs",
      :key="index",
      :to="`/${prefix}/${item.path}`",
      :class="{active: item.name===active}",
      class="el-link item"
    )
      span {{ item.label }}
  el-scrollbar.is-vertical.sp-fixed-height__126
    slot
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    prefix: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    }
  }
}
</script>
