<template>
  <table-container v-bind="conf" style="margin:0" />
</template>
<script>
import TableContainer from '~/components/table-container'
import * as conf from './family.conf'
export default {
  components: { TableContainer },
  data () {
    return {
      loading: true,
      conf,
      tableData: [],
      keyword: '',
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
    onSearch() {},
    onAdd() {},
    async fetch() {
      this.loading = true
      try {
        const { data } = await this.$axios.post('/hrTaFamilyInfo/list', {
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
