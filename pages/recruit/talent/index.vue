<template>
  <el-scrollbar class="is-vertical sp-fixed-height__one">
    <table-container />
  </el-scrollbar>
</template>

<script>
import TableContainer from '~/components/table-container'

export default {
  components: { TableContainer },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    async onRemove () {
      await this.$confirm('确定移出人才库？ 该操作只会从人才库中移出人才，TA 在候选人中的应聘记录不会被移出。', '移出人才库', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning'
      })
      this.$notify({
        type: 'success',
        message: '已移出人才库!'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
