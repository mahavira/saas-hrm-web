<template>
  <div class="el-container is-vertical">
    <summary-header :data="total" style="top:0;background-color:#FFF;padding-bottom:30px" />
    <el-scrollbar class="is-vertical" style="height:calc(100vh - 64px - 94px)">
      <table-container ref="tableContainer" />
    </el-scrollbar>
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
        label: '全部',
        value: 129,
        isPrimary: true
      }, {
        label: '新候选',
        value: 9
      }, {
        label: '初试通过',
        value: 9
      }, {
        label: '面试安排',
        value: 9
      }, {
        label: '面试结果',
        value: 9,
        children: [{
          label: '面试通过',
          value: 103
        }, {
          label: '待接受offer',
          value: 1203
        }, {
          label: '待入职',
          value: 3
        }, {
          label: '已淘汰',
          value: 11
        }]
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
