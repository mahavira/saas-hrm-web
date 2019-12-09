<template>
  <div>
    <div class="el-container">
      <div class="sp-date-selection">
        <div @click="onBack(-1)" class="handle-left">
          <i class="el-icon-arrow-left is-primary" />
        </div>
        <div class="handle-center">{{ date }}</div>
      </div>
      <div class="handler">
        <div class="list-block">
          <div class="block">
            <div class="num">6,451,352</div>
            <div class="label">本月计薪人数</div>
          </div>
          <div class="block">
            <div class="num">￥6,316,511</div>
            <div class="label">预计应发工资</div>
          </div>
          <div class="block">
            <div class="num">￥6,451,352</div>
            <div class="label">个人所得税</div>
          </div>
          <div class="block">
            <div class="num">￥6,316,511</div>
            <div class="label">预计实发工资</div>
          </div>
          <div class="block">
            <div class="num">￥355,381</div>
            <div class="label">企业社保</div>
          </div>
          <div class="block">
            <div class="num">￥225,151,512</div>
            <div class="label">企业公积金</div>
          </div>
        </div>
      </div>
    </div>
    <table-container />
  </div>
</template>
<script>
import TableContainer from '~/components/table-container'

export default {
  components: { TableContainer },
  data () {
    return {
    }
  },
  computed: {
    date () {
      const date = this.$route.query.date.split('-')
      return `${date[0]}年${date[1]}月考勤表`
    }
  },
  created () {
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-container{
  padding: 24px 32px 0;
  justify-content: space-between;
}
.list-block{
  display: flex;
  font-size:16px;
  color:rgba(0,0,0,1);
  position: relative;
  flex: auto;
  .block{
    flex-direction: column;
    padding: 8px 0 0 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .num{
    font-size: 20px;
    font-weight: 500;
    font-family:DINAlternate-Bold,DINAlternate;
    margin-bottom: 8px;
  }
  .label{
    font-size:14px;
    color:rgba(127,127,127,1);
    line-height: 1;
  }
}
</style>
