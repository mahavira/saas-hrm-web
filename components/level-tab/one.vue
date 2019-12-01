<template lang="pug">
.el-container.is-vertical.is-relative
  .sp-tabs__one(v-if="tabs.length")
    nuxt-link(v-for="(item, index) in tabs", :key="index", :to="`/${prefix}/${item.path}`", :class="{active: item.name===active}", class="el-link item")
      span {{item.label}}
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
