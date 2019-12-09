<template>
  <div>
    <div class="sp-filter is-white-bg">
      <div />
      <div>
        <el-button type="primary" size="small" class="is-shadow"><i class="el-icon-setting" /> 设置</el-button>
        <el-button @click="onExport" type="default" size="small" class="is-shadow"><i class="el-icon-download is-primary" /> 下载</el-button>
      </div>
    </div>
    <organization-chart
      ref="chart"
      :datasource="ds"
      :pan="true"
      :zoom="true"
      :zoomin-limit="2"
      class="chart"
    >
      <template slot-scope="{ nodeData }">
        <div>{{ nodeData.title }}</div>
      </template>
    </organization-chart>
  </div>
</template>
<script>
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'
export default {
  components: {
    OrganizationChart
  },
  data () {
    return {
      ds: {
        'id': '1',
        'name': 'Lao Lao',
        'title': '我是最大组织名称',
        'children': [
          { 'id': '2',
            'name': 'Bo Miao',
            'title': '产品部',
            'children': [
              { 'id': '6', 'name': 'Pang Pang', 'title': '产品一' },
              { 'id': '7', 'name': 'Xiang Xiang', 'title': '产品三' }
            ] },
          { 'id': '3',
            'name': 'Su Miao',
            'title': '营销部',
            'children': [
              { 'id': '4', 'name': 'Tie Hua', 'title': '营销二' },
              { 'id': '5',
                'name': 'Hei Hei',
                'title': '营销一'
              }
            ]
          },
          { 'id': '9', 'name': 'Chun Miao', 'title': '法律部' }
        ]
      }
    }
  },
  mounted () {
    console.log(this.$refs.chart)
  },
  methods: {
    onExport (e) {
    }
  }
}
</script>
<style lang="scss" scoped>

.chart{
  flex: 1;
  width: 100%;
  border: none;
  /deep/{
    .node{
      border-radius:10px;
      background: #FFF;
      padding: 20px;
      margin: 0 5px;
      width: auto;
    }
    .orgchart{
      background: none;
      >table>tbody>.nodes .node{
        background: rgba(211, 247, 244, 1)
      }
    }
    .orgchart .lines .topLine {
      border-top-color: rgba(185, 192, 206, 1);
    }
    .orgchart .lines .rightLine {
        border-right-color: rgba(185, 192, 206, 1);
    }
    .orgchart .lines .leftLine {
      border-left-color: rgba(185, 192, 206, 1);
    }
    .orgchart .lines .downLine {
      background-color: rgba(185, 192, 206, 1)
    }
  }
}
</style>
