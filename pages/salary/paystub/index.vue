<template>
  <div style="height:0">
    <div class="sp-filter is-white-bg">
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
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-s-order is-primary" /> 操作记录</el-button>
      </div>
    </div>
    <el-scrollbar class="is-vertical" style="flex: 1">
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
                  <div class="num">462</div>
                  <div class="label">计薪人数</div>
                </div>
                <div class="block">
                  <div class="num">6,451,352</div>
                  <div class="label">应发工资</div>
                </div>
              </div>
              <div class="list-block">
                <div class="block">
                  <div class="num">0</div>
                  <div class="label">已发放</div>
                </div>
                <div class="block">
                  <div class="num">0</div>
                  <div class="label">已查看</div>
                </div>
                <div class="block">
                  <div class="num is-primary">0</div>
                  <div class="label">问题反馈</div>
                </div>
              </div>
              <div class="list-block view">
                <el-dropdown @command="onDropdown($event)">
                  <i class="el-icon-more is-rotate-90" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="detail"><i class="el-icon-plus is-primary" /> 查看发放详情</el-dropdown-item>
                    <el-dropdown-item command=""><i class="el-icon-edit is-primary" /> 查看工资条</el-dropdown-item>
                    <el-dropdown-item command="delete"><i class="el-icon-delete is-primary" /> 删除工资条</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keyword: '',
      yearInx: 0
    }
  },
  computed: {
    date () {
      const year = this.$moment().add(this.yearInx, 'year').format('YYYY')
      return `${year}年工资条`
    }
  },
  methods: {
    onDelete () {
      this.$confirm('确定删除该工资条', '提示', {
        type: 'warning'
      })
    },
    onSearch () {},
    onDropdown (e) {
      if (e === 'detail') {
        this.$router.push(`/salary/paystub/detail?date=2019-09`)
      } else if (e === 'delete') {
        this.onDelete()
      }
    },
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
