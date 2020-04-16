<template>
  <div>
    <table-container ref="tableContainer" v-bind="conf" />
    <el-dialog
      :visible.sync="visibleOfferDialog"
      title="查看offer"
      class="offer"
      width="690px"
      top="80px"
    >
      <div class="content">
        <h3 class="title">录用通知书/Job offer</h3>
        <div id="printJS-form" class="body">
          <h3>尊敬的John Brown</h3>
          <div>
            感谢您对公司的认可，非常荣幸地通知您，您已被我司正式录用，欢迎您加入蓝图云科技有限公司
            <div class="body-list">
              您所入职的部门：市场部/市场一部<br>
              您所入职的岗位：门店经理<br><br>
              入职所需的材料和证件<br>
              1. 原单位离职证明（加盖原单位公章）1份<br>
              2. 身份证原件<br>
              3. 学位证、毕业证原件<br>
              4. 相关资格证书原件<br>
              5. 入职体检证明<br><br>
              请您于2019-06-21 带以上材料，进行报到<br>
              联系人：张三<br>
              联系电话：151656151652<br>
              联系人邮箱：156516@163.com<br><br>
            </div>
            收到此通知后，请您点击底部按钮进行回复确认，再次欢迎您加入！蓝图云科技有限公司 ！
          </div>
        </div>
        <div class="content-ps">
          <b>此邮件内容为蓝图HRM代发，请勿直接回复！</b>
          所有内容为蓝图HRM企业用户张贴或发送，无论系公开还是私下传送，均由内容提供者承担责任。蓝图HRM会尽合理努力按照国家有关规定严格审查，但无法完全控制经由软件/网站服务传送的内容，不保证内容的正确性、完整性。
        </div>
      </div>
      <div slot="footer">
        <div class="el-container is-justify-space-between">
          <el-button type="default" class="is-shadow" size="small">导 出</el-button>
          <el-button @click="onPrint" type="primary" class="is-shadow" size="small">打 印</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import printJS from 'print-js'
import TableContainer from '~/components/table-container'
const conf = {
  all: require('./all.conf'),
  invalid: require('./invalid.conf'),
  accepted: require('./accepted.conf')
}
export default {
  components: { TableContainer },
  data () {
    return {
      visibleOfferDialog: false
    }
  },
  computed: {
    conf () {
      return conf[this.$route.params.index]
    }
  },
  methods: {
    openOffer (row) {
      this.visibleOfferDialog = true
    },
    openArchive (ref) {
      this.$router.push(`/recruit/talent/${ref.currentRow.id}`)
    },
    onPrint () {
      printJS('printJS-form', 'html')
    }
  }
}
</script>
<style lang="scss" scoped>
.offer{
  .content{
    margin: 25px 60px 20px;
    line-height: 22px;
  }
  .title{
    font-size: 18px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    line-height: 1;
  }
  .body{
    padding: 30px 42px 40px;
    background:rgba(255,255,255,1);
    border:4px solid rgba(246,230,46,1);
    position: relative;
    &::before{
      content: '';
      position: absolute;
      left: 8px;
      right: 8px;
      top: 8px;
      bottom: 8px;
      border:1px solid rgba(246,230,46,1);
    }
  }
  .body-list{
    padding-left: 30px;
  }
  .content-ps{
    padding: 16px;
  }
}
</style>
