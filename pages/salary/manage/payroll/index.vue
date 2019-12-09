<template>
  <div>
    <div class="sp-filter">
      <div class="sp-date-selection">
        <div @click="onYear(-1)" class="handle-left">
          <i class="el-icon-arrow-left" />
        </div>
        <div class="handle-center">{{ date }}</div>
        <div @click="onYear(1)" class="handle-right">
          <i class="el-icon-arrow-right" />
        </div>
      </div>
      <div class="handler">
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-upload is-primary" /> 上传工资表</el-button>
      </div>
    </div>
    <div class="items">
      <div v-for="index in 9" :key="index" class="sp-salary">
        <div class="header">
          9月
        </div>
        <div class="body">
          <div v-for="i in 3" :key="i" class="inner">
            <div class="list-block">
              9月工资汇总表
            </div>
            <div class="list-block">
              <div class="block">
                <div class="num">2019/08</div>
                <div class="label">个税所属期</div>
              </div>
              <div class="block">
                <div class="num">2019/08</div>
                <div class="label">个税所属期</div>
              </div>
            </div>
            <div class="list-block">
              <div class="block">
                <div class="num">6,451,352</div>
                <div class="label">应发工资</div>
              </div>
              <div class="block">
                <div class="num">6,316,511</div>
                <div class="label">实发工资</div>
              </div>
              <div class="block">
                <div class="num">355,381</div>
                <div class="label">个税总额</div>
              </div>
              <div class="block">
                <div class="num">225,151,512</div>
                <div class="label">企业成本</div>
              </div>
            </div>
            <div @click="$router.push('payroll/detail?date=2019-09')" class="list-block view">
              <i class="el-icon-view" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      yearInx: 0
    }
  },
  computed: {
    date () {
      const year = this.$moment().add(this.yearInx, 'year').format('YYYY')
      return `${year}年工资表`
    }
  },
  methods: {
    onDelete () {},
    onYear (e) {
      this.yearInx = this.yearInx + e
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
