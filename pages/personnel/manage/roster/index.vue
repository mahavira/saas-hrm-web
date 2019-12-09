<template>
  <div class="el-container is-vertical">
    <summary-header :data="total" />
    <table-container ref="tableContainer" />
  </div>
</template>
<script>
import SummaryHeader from '~/components/summary-header'
import TableContainer from '~/components/table-container'

export default {
  components: { SummaryHeader, TableContainer },
  data () {
    return {
      total: [{
        label: '在职',
        value: 9
      }, {
        label: '全职',
        value: 9,
        children: [{
          label: '全职',
          value: 103
        }, {
          label: '实习生',
          value: 1203
        }, {
          label: '劳务派遣',
          value: 3
        }, {
          label: '退休返聘',
          value: 11
        }]
      }, {
        label: '试用期',
        value: 9
      }, {
        label: '待入职',
        value: 9
      }, {
        label: '待离职',
        value: 9
      }]
    }
  },
  methods: {
    toInfo (e) {
      this.$router.push(`/personnel/manage/roster/${e.currentRow.educationInfoId}`)
    }
  }
}
</script>
