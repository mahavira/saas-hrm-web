<template>
  <el-scrollbar class="content is-vertical">
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component v-bind:is="mod" />
  </el-scrollbar>
</template>
<script>
import modA from './mods/-a'
export default {
  /* eslint-disable vue/no-unused-components */
  components: { modA },
  props: {
    mod: { type: String, default: 'mod-a' }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.content{
  height: 100%;
}
</style>
