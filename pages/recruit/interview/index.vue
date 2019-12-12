<template>
  <div>
    <div class="sp-filter is-white-bg">
      <div class="sp-date-selection">
        <div @click="onWeek(-1)" class="handle-left">
          <i class="el-icon-arrow-left" />
        </div>
        <div class="handle-center">{{ date }}</div>
        <div @click="onWeek(1)" class="handle-right">
          <i class="el-icon-arrow-right" />
        </div>
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          class="search"
          size="small"
          placeholder="请输入姓名搜索"
          suffix-icon="icon-ico_Search"
        />
      </div>
      <div class="handler">
        <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="icon-ico_calendar is-primary" /> 安排面试</el-button>
      </div>
    </div>
    <timeline :weekInx="weekInx" />
  </div>
</template>
<script>
import Timeline from './-timeline'
export default {
  components: { Timeline },
  data () {
    return {
      keyword: '',
      weekInx: 0
    }
  },
  computed: {
    date () {
      const sDay = this.weekInx * 7
      let weekOfday = parseInt(this.$moment().format('d'))
      if (weekOfday === 0) { weekOfday = 7 }
      const start = this.$moment().add(sDay - weekOfday + 1, 'days')
      const end = this.$moment().add(sDay - weekOfday + 7, 'days')
      return `${start.format('MM月DD日')}—${end.format('MM月DD日')}`
    }
  },
  methods: {
    onDelete () {},
    onSearch () {},
    onWeek (e) {
      this.weekInx = this.weekInx + e
    }
  }
}
</script>
<style lang="scss" scoped>
.search{
  margin-left: 30px;
}
</style>
