<template>
  <div class="sidebar">
    <div class="title">岗位类别</div>
    <div class="">
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item v-for="i in 6" :key="i" :name="i" title="销售部">
          <el-tree
            ref="tree"
            :data="data"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            :current-node-key="0"
            @node-click="onTapNode"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: 1,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }, {
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }]
    }
  },
  mounted () {
    console.log(this.$refs.tree)
  },
  methods: {
    handleChange () {},
    onTapNode (a, b, c) {
      console.log(a, b, c)
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar{
  width: 321px;
  border-right: 1px solid rgba(233,233,233,1);
  overflow: hidden;
  .title{
    line-height: 22px;
    padding: 16px 32px 16px;
    background:rgba(241,242,244,0.5);
    color: rgba($color: #000000, $alpha: 0.39);
    font-weight: 500;
  }
  /deep/{
    .el-collapse{
      border: none
    }
    .el-collapse-item__header{
      padding: 0 10px 0 32px;
      background: transparent
    }
    .el-collapse-item__content{
      padding: 0 32px 10px;
    }
  }
}
</style>
