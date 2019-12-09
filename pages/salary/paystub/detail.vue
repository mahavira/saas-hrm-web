<template>
  <div style="height:0">
    <div class="sp-filter is-white-bg">
      <div class="sp-date-selection">
        <div @click="onBack(-1)" class="handle-left">
          <i class="el-icon-arrow-left is-primary" />
        </div>
        <div class="handle-center">{{ date }}</div>
      </div>
      <div class="handler">
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-s-order is-primary" /> 查看工资条</el-button>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-s-order is-primary" /> 发送工资条</el-button>
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-s-order is-primary" /> 删除工资条</el-button>
      </div>
    </div>
    <summary-header :data="summary" style="top:0;" />
    <table-container />
  </div>
</template>
<script>
import SummaryHeader from '~/components/summary-header'
import TableContainer from '~/components/table-container'

export default {
  components: { SummaryHeader, TableContainer },
  data () {
    return {
      keyword: '',
      yearInx: 0,
      summary: [{
        label: '已发放',
        value: 211
      }, {
        label: '待发放',
        value: 133,
        isPrimary: true
      }, {
        label: '问题反馈',
        value: 0,
        unit: '条'
      }, {
        label: '发放记录',
        value: 9,
        unit: '条'
      }]
    }
  },
  computed: {
    date () {
      const date = this.$route.query.date.split('-')
      return `${date[0]}年${date[1]}月工资条发放详情`
    }
  },
  methods: {
    onDelete () {
      this.$confirm('确定删除该工资条', '提示', {
        type: 'warning'
      })
    },
    onBack () {
      this.$router.back()
    },
    onSearch () {},
    onDropdown () {},
    onYear (e) {
      this.yearInx = this.yearInx + e
    }
  }
}
</script>
<style lang="scss" scoped>
.items{
  margin-top: 24px;
}
</style>
