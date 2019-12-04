<template>
  <div>
    <div class="sp-filter is-white-bg">
      <div />
      <div>
        <el-button type="primary" size="small" class="is-shadow"><i class="el-icon-setting" /> 设置</el-button>
        <el-button @click="onExport" type="default" size="small" class="is-shadow"><i class="el-icon-download is-primary" /> 下载</el-button>
      </div>
    </div>
    <div class="chart">
      <!-- <vo-basic ref="orgchart" :data="chartData" /> -->
    </div>
  </div>
</template>
<script>
// import { VoBasic } from 'vue-orgchart'
// import 'vue-orgchart/dist/style.min.css'
export default {
  // components: { VoBasic },
  data () {
    return {
      chartData: {
        name: 'JavaScript',
        children: [
          { name: 'Angular' },
          {
            name: 'React',
            children: [{ name: 'Preact' }]
          },
          {
            name: 'Vue',
            children: [{ name: 'Moon' }]
          }
        ]
      }
    }
  },
  mounted () {
    console.log(this.$refs.orgchart)
  },
  methods: {
    onExport (e) {
      console.log(this.$refs.orgchart, this.$refs.orgchart.orgchart)
      // this.$refs.orgchart.orgchart._clickExportButton()
    }
  }
}
</script>
<style lang="scss" scoped>

.chart{
  flex: 1;
  /deep/{
    #chart-container{
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .orgchart .node .title{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
