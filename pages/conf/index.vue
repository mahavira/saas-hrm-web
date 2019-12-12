<template>
  <div class="container">
    <div class="sidebar">
      <el-scrollbar class="is-vertical">
        <el-tree
          :data="data"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-scrollbar>
    </div>
    <div class="main">
      <div v-for="(item,key) in currentMod" :key="key" class="mod">
        <h1>{{ key }}</h1><pre>{{ item }}
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mods } from '~/config/mods'

function pushItem ([arg1, ...arg2], data, base) {
  if (!arg1) { return }
  const has = data.some((item) => {
    if (item.label === arg1) {
      pushItem(arg2, item.children, item.path)
      return true
    }
    return false
  })
  if (!has) {
    const item = {
      label: arg1,
      path: `${base}/${arg1}`,
      children: []
    }
    data.push(item)
    pushItem(arg2, item.children, item.path)
  }
}
const data = []
Object.keys(mods).forEach((key) => {
  pushItem(key.split('/').filter(n => n), data, '')
})
export default {
  layout: 'null',
  data () {
    return {
      mods,
      data,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      currentMod: {}
    }
  },
  methods: {
    handleNodeClick (e) {
      if (!mods[e.path]) { return }
      this.currentMod = mods[e.path]
    }
  }
}
</script>
<style scoped lang="scss">
.sidebar{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: #FFF;
  padding-left: 15px;
  box-shadow: 5px 5px 5px rgba($color: #000000, $alpha: 0.2);
  .is-vertical{
    height: 100%;
  }
  /deep/{
    .el-tree-node__content{
      padding: 0;
    }
    .is-leaf.el-tree-node__expand-icon.el-icon-caret-right + .el-tree-node__label{
      text-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.3);
    }
  }
}
.main{
  margin-left: 270px;
  padding: 15px;
}
</style>
