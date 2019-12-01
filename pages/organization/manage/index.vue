<template>
  <div style="height:0">
    <div class="header">
      <div>
        <div class="top is-justify-space-between el-row--flex">
          <div class="title">
            我是最大组织名称
          </div>
          <div class="items el-row--flex">
            <div v-for="i in 7" :key="i" class="item">
              <div class="label">在职人数</div>
              <div class="count"><b>111</b>人</div>
            </div>
          </div>
        </div>
        <div class="sp-filter">
          <div class="search">
            <el-input
              v-model="keyword"
              @keyup.enter.native="onSearch"
              size="small"
              placeholder="请输入搜索关键词"
              suffix-icon="el-icon-search"
            />
          </div>
          <div class="handler">
            <el-button @click="onAdd" type="primary" class="is-shadow" size="small"><i class="el-icon-plus" /> 新增组织</el-button>
            <el-button @click="onExport" type="default" class="is-shadow" size="small"><i class="el-icon-download is-primary" /> 导 出</el-button>
            <el-button @click="onExport" type="default" class="is-shadow" size="small"><i class="el-icon-finished is-primary" /> 批 量</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-scrollbar class="is-vertical" style="flex: 1">
      <div class="org-items el-container">
        <div v-for="i in 7" :key="i" class="el-container org-item">
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
              <el-tree :data="data" :props="defaultProps" :default-expand-all="true" :show-checkbox="showCheckbox" @node-click="handleNodeClick" />
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <transition name="transform-y">
      <div v-if="showFooter" class="footer el-container">
        <div>已选择 <span class="count">4</span> 条</div>
        <div>
          <el-button @click="onExport" :loading="loading" size="small">取消</el-button>
          <el-button @click="onExport" :loading="loading" size="small" type="primary">确认删除</el-button>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keyword: '',
      showCheckbox: false,
      showFooter: false,
      loading: false,
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
    onAdd () {
    },
    onExport () {
      this.showCheckbox = !this.showCheckbox
      this.showFooter = !this.showFooter
    },
    onSearch () {},
    handleNodeClick () {}
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/var.scss';
.header{
  background: #FFF;
  box-shadow: 1px 2px 2px #F1F2F4;
  .top{
    padding: 32px 32px 0;
  }
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .items{
    text-align: center;
    .item{
      margin-left: 45px;
      .label{
        color:rgba(0,0,0,0.68);
        margin-bottom: 12px;
      }
      .count{
        color: rgba(0,0,0,0.5);
        font-size: 16px;
        b{
          color: #000;
          font-size: 18px;
        }
      }
    }
  }
  .sp-filter{
    padding-top: 32px;
  }
}
.org-items{
  margin: 26px;
  flex-wrap: wrap;
  padding-bottom: 72px;
  justify-content: space-between;
}
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

.footer{
  position: fixed;
  bottom: 0;
  left: 80px;
  right: 0;
  padding: 16px 32px 24px;
  background: #FFF;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  box-shadow:0px 4px 20px 0px rgba(0,0,0,0.2);
  border-radius: 10px 10px 0px 0px;
  .count{
    font-size: 20px;
    color: $color-primary
  }
}
</style>
