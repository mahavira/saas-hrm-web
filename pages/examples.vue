<template>
  <div class="main">
    <el-tabs @tab-click="handleClick" type="border-card">
      <el-tab-pane
        v-for="(item, index) in menus"
        :key="index"
        :to="`/examples/${item.path}`"
        :label="item.title"
        :name="item.path"
      />
    </el-tabs>
    <el-scrollbar
      class="is-vertical"
      style="height: calc(100vh - 105px)"
    >
      <nuxt-child class="container" />
    </el-scrollbar>
  </div>
</template>
<script>
const menus = [{
  path: 'icon',
  title: '图标'
}, {
  path: 'button',
  title: '按钮'
}, {
  path: 'message',
  title: '消息'
}, {
  path: 'notification',
  title: '通知'
}, {
  path: 'message-box',
  title: '消息窗口'
}, {
  path: 'dialog',
  title: '对话框'
}, {
  path: 'tabs',
  title: 'Tab'
}, {
  path: 'form',
  title: '表单'
}]

export default {
  data () {
    return {
      menus
    }
  },
  methods: {
    handleClick (e) {
      this.$router.push(`/examples/${e.name}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  background: #FFF;
  /deep/{
    .el-tabs--border-card{
      box-shadow: none;
    }
    .el-tabs__content{
      display: none
    }
  }
}
.container{
  padding: 32px;
}
</style>
