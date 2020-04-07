<template>
  <el-dialog
    :visible.sync="visible"
    @close="close"
    :show-close="false"
    :center="true"
    :append-to-body="true"
    width="438px"
    custom-class="message-dialog"
  >
    <div :class="type" class="icon" />
    <div class="text">{{ message }}</div>
    <div slot="footer">
      <el-button
        @click="close"
        type="primary"
        size="small"
        class="is-large-padding"
      >
        好的
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
const msg = {
  'handler-error': '操作失败',
  'handler-success': '操作成功',
  'no-network': '没有网络啦',
  'system-error': '系统错误，请重新加载页面',
  'system-maintaining': '系统升级中',
  'null': '还什么没有呢'
}
export default {
  props: {
    visible: { type: Boolean, default: false },
    type: { type: String, default: 'handler-error' },
    text: { type: String, default: '' }
  },
  computed: {
    message () {
      if (this.text) { return this.text }
      if (msg[this.type]) { return msg[this.type] }
      return ''
    }
  },
  watch: {
    $route () {
      if (this.visible === false) { return }
      this.close()
    }
  },
  methods: {
    close () {
      if (!this.visible) { return }
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ {
  .message-dialog {
    .el-dialog__header{
      display: none
    }
    .el-dialog__body{
      padding: 20px 0 0 ;
      text-align: center;
    }
    .el-dialog__footer{
      text-align: center;
    }
  }
}

.icon{
  width: 350px;
  height: 300px;
  margin: 0 auto;
  background: url(~assets/imgs/handler-success.png) center no-repeat;
  background-size: contain;
  &.handler-error{ background-image: url(~assets/imgs/handler-error.png); }
  &.handler-success{ background-image: url(~assets/imgs/handler-success.png); }
  &.no-network{ background-image: url(~assets/imgs/no-network.png); }
  &.system-error{ background-image: url(~assets/imgs/system-error.png); }
  &.system-maintaining{ background-image: url(~assets/imgs/system-maintaining.png); }
  &.null{ background-image: url(~assets/imgs/null.png); }
}
.text{
  height: 30px;
  font-size: 16px;
}
</style>
