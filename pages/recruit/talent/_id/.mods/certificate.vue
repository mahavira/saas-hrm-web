<template>
  <div class="container" v-loading="loading">
      <el-table :data="tableData">
        <el-table-column prop="certificateName" label="证书名称" />
        <el-table-column prop="certificateNo" label="证件/证书编号" />
        <el-table-column prop="certificateType" label="证书/证件类型" />
        <el-table-column prop="issuingAgency" label="发证机构" />
        <el-table-column prop="level" label="级别" />
        <el-table-column prop="profession" label="专业" />
      </el-table>
  </div>
</template>
<script>
import { toBooble } from '~/utils'
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
        const { data } = await this.$axios.post('/hrTaIdentityInfo/list', {
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
      else if (property === 'isPrimaryContact') return toBooble(cellValue) ? '是' : '否'
    }
  }
}
</script>
<style scoped lang="scss">

</style>
