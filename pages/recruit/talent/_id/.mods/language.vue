<template>
  <div class="container" v-loading="loading">
      <el-table :data="tableData">
        <el-table-column prop="language" label="语种" />
        <el-table-column prop="mastery" label="掌握程度" />
        <el-table-column prop="skillLength" label="掌握时长（月为单位）" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      pagination: {
        page: 1,
        limit: 10
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      try {
        const { data } = await this.$axios.post('/hrTaLanguageSkills/list', {
          tenantId: this.$route.params.id,
          searchText: this.keyword,
          limit: this.pagination.size,
          page: this.pagination.page
        })
        if (data.status === 200 || data.status === 0) {
          this.tableData = data.data.rows
        } else {
          throw new Error(data.message)
        }
      } finally {
        this.loading = false
      }
    },
    formatter(row, { property }, cellValue) {
      if (property === 'birthday') return this.$moment(cellValue).format('YYYY-MM-DD')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
