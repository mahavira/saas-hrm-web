<template>
  <div>
    <el-scrollbar v-if="showScrollbar" class="is-vertical sp-fixed-height__one">
      <table-container />
    </el-scrollbar>
    <table-container v-else />
  </div>
</template>
<script>
import TableContainer from '~/components/table-container'
export default {
  components: { TableContainer },
  data () {
    const showScrollbar = this.$route.path.split('/').length <= 3
    return {
      showScrollbar
    }
  },
  created () {
    console.warn('UNMATCHED')
  }
}
</script>
