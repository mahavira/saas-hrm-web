<template>
  <div class="wrp">
    <div class="summary">
      <div class="num">10%</div>
      <div class="stitle">重要档案存档率 <i class="icon-ico_doubt" /></div>
      <div class="toast">这部分的内容线下的直接拖拽做登记，上传之后，点击能查看源文件</div>
    </div>
    <div v-for="(confItem,key) in conf" :key="key" class="items">
      <div class="title">
        <div>{{ confItem.label }}</div>
      </div>
      <div class="inner">
        <div v-for="(item,index) in confItem.fields" :key="index" :class="{division:!item.name, has: data[item.name]}" class="item">
          <div v-if="!item.name" />
          <el-upload v-else action="" :show-file-list="false">
            <i :class="item.icon" class="item-upload__icon icon-png" />
            <div class="item-upload__text">{{ item.label }}</div>
            <i v-if="data[item.name]" @click.stop="onDelete(item)" class="icon-ico_delete" />
          </el-upload>
        </div>
      </div>
      <div class="footer">
        <el-button @click="item.edited=false" type="default" size="small">取消</el-button>
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import conf from './f'
export default {
  data () {
    return {
      conf,
      data: {
        entry_resume: 'x',
        idcard: 'x'
      }
    }
  },
  created () {
  },
  methods: {
    onEdit (item, index) {
    },
    onAdd (item, key) {
    },
    onDelete (item) {
      this.data[item.name] = ''
    }
  }
}
</script>
<style scoped lang="scss">
@import '~/assets/var.scss';
.summary{
  padding: 16px 40px 24px;
  line-height: 1;
  border-bottom: 1px solid rgba(233,233,233,1);
  .num{
    font-size:24px;
  }
  .stitle{
    font-size: 16px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    line-height:24px;
    margin: 20px 0 10px;
    i{
      color: $color-yellow;
      font-size: 24px;
      vertical-align: bottom;
    }
  }
  .toast{
    font-size:12px;
    color:rgba(0,0,0,0.85);
  }
}
.items{
  padding: 0 40px;
  .title{
    padding: 16px 0;
  }
  .inner{
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    font-size:12px;
    color:rgba(0,0,0,0.85);
    position: relative;
    margin-bottom: 16px;
    margin-right: 16px;
    border: 2px dashed rgba(216,213,237,1);
    opacity: 0.5;
    box-sizing: border-box;
    &.has{
      opacity: 1;
      background:rgba(248,248,250,1);
      border:2px solid rgba(248,248,250,1);
      .icon-ico_delete{
        color: rgba($color: #000000, $alpha: 0.3);
      }
    }
    &.division{
      flex: 0 0 100%;
      height: 8px;
      background: transparent;
      border-color: transparent;
    }
    /deep/{
      .el-upload{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width:140px;
        height:140px; 
      }
    }
    .item-upload__text{
      margin-top: 10px;
    }
    .icon-ico_delete{
      position: absolute;
      bottom: 0;
      right: 0;
      padding-top: 7px;
      width: 30px;
      height: 23px;
      vertical-align: middle;
      font-size: 16px;
      &:hover{
        color: $color-primary;
      }
    }
  }
  .footer{
    padding: 16px 0;
    text-align: right;
  }
}

</style>
