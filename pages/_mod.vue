<template>
  <div class="el-container is-vertical is-relative">
    <div class="sp-tabs__one">
      <nuxt-link
        v-for="(item, index) in tabs"
        :key="index"
        :to="`/personnel/${item.path}`"
        :class="{active: item.name===currentPath}"
        class="el-link item"
      >
        <span>{{ item.label }}</span>
      </nuxt-link>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
const level = 1
export default {
  data () {
    return {
    }
  },
  computed: {
    tabs () {
      return this.$store.getters['route/currentMenu'](level)
    },
    currentPath () {
      return this.$store.getters['route/currentPath'](level)
    }
  }
}
</script>
