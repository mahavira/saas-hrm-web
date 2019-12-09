<template>
  <div class="el-container org-item">
    <div class="side">
      <div class="title">产品部</div>
      <div class="a-items">
        <div class="a-item">负责人：欧阳小学</div>
        <div class="a-item">分管领导：欧阳小学</div>
      </div>
      <div class="b-items">
        <div class="b-item el-container">
          <div class="label">组织类型</div>
          <div class="txt"><b>部门</b></div>
        </div>
        <div v-for="k in 5" :key="k" class="b-item el-container">
          <div class="label">组织类型</div>
          <div class="txt"><b>30</b>人</div>
        </div>
      </div>
    </div>
    <div class="handler el-container is-vertical">
      <div>
        <a href="javascript:;">
          <i class="el-icon-plus" />
        </a>
        <a href="javascript:;">
          <i class="el-icon-edit" />
        </a>
      </div>
      <div>
        <a href="javascript:;">
          <i class="el-icon-delete-solid" />
        </a>
      </div>
    </div>
    <div class="tree">
      <el-scrollbar class="is-vertical" style="height:100%">
        <el-tree :data="data" :props="defaultProps" :default-expand-all="true" :show-checkbox="showCheckbox" @node-click="handleNodeClick">
          <span slot-scope="{ node }" class="custom-tree-node">
            <span>{{ node.label }} 1111</span>
            <span />
          </span>
          <div slot-scope="{ node }" class="sp-tree-node">
            <span class="label">{{ node.label }}</span>
            <div class="icon">
              <i class="el-icon-plus" />
              <i class="el-icon-edit" />
              <i class="el-icon-delete" />
            </div>
          </div>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showCheckbox: { type: Boolean, default: false }
  },
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick () {}
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/var.scss';
.org-item{
  flex: 0 0 calc(50% - 24px);
  height: 318px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 5px 0px rgba(0,0,0,0.05);
  border-radius:10px;
  margin: 12px;
  position: relative;
  transition: all 0.3s;
  .side{
    width: 207px;
    padding: 24px;
    box-sizing: border-box;
    .title{
      font-size:16px;
      font-weight:500;
      color:rgba(0,0,0,1);
      margin-bottom: 10px;
    }
    .a-items{
      font-size:12px;
      color:rgba(0,0,0,0.425);
      line-height:20px;
    }
    .b-items{
      color:rgba(0,0,0,0.68);
      line-height:22px;
      margin-top: 30px;
    }
    .b-item{
      margin-top: 8px;
      >div{
        flex: 1;
      }
      .txt b{
        color:rgba(0,0,0,1);
      }
    }
  }
  .tree{
    background:rgba(248,248,250,1);
    flex: 1;
    padding: 12px;
    position: relative;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .handler {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60px;
    padding: 10px 0;
    background:$color-primary;
    border-radius:10px 10px 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    visibility: hidden;
    transition: all 0.3s;
    a{
      color: #FFF;
      display: block;
      padding: 10px 12px 10px 0;
      font-size: 20px;
    }
  }
  &:hover{
    box-shadow: 0px 4px 20px 0px rgba(0,0,0,0.2);
    z-index: 1;
    transform: translateX(-18px);
    .handler{
      visibility: visible;
      transform: translate(46px);
      box-shadow: 4px 4px 20px 0px rgba(0,0,0,0.2);
    }
  }
}

</style>
