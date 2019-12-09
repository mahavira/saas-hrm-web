<template>
  <div class="header">
    <div v-for="(item,index) in data" :key="index" :class="{'is-primary':item.isPrimary}" class="item">
      {{ item.label }} <span :class="{'is-primary':item.isPrimary}" class="num">{{ item.value }}</span> {{ item.unit || unit }}
      <el-popover
        v-if="item.children && item.children.length"
        placement="bottom"
        trigger="hover"
        width="432"
      >
        <div class="popover">
          <div v-for="(citem,i) in item.children" :key="i" class="item">
            <div>{{ citem.label }}</div>
            <div><span>{{ item.value }}</span> {{ item.unit || unit }}</div>
          </div>
        </div>
        <i slot="reference" class="el-icon-caret-bottom" />
      </el-popover>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    unit: { type: String, default: '人' },
    data: {
      type: Array,
      default: () => [{
        label: '在职',
        value: 9
      }, {
        label: '全职',
        value: 9,
        children: [{
          label: '全职',
          value: 103
        }, {
          label: '实习生',
          value: 1203
        }, {
          label: '劳务派遣',
          value: 3
        }, {
          label: '退休返聘',
          value: 11
        }]
      }, {
        label: '试用期',
        value: 9
      }, {
        label: '待入职',
        value: 9
      }, {
        label: '待离职',
        value: 9
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/var.scss';
.header{
  padding: 30px 32px 0;
  position: relative;
  bottom: -8px;
  .item{
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color:rgba(0,0,0,0.45);
    line-height: 28px;
    padding: 0 32px;
    position: relative;
    .num{
      font-size: 16px;
      color: #0BAFB7;
      display: inline-block;
      text-align: right;
      padding-left: 16px;
    }
    &.is-primary{
      .num{
        font-size: 32px;
      }
    }
    &:before{
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      height: 28px;
      width: 1px;
      background: #CCCCCD;
    }
    &:last-of-type:before{
      content: none;
    }
    &:first-of-type{
      padding-left: 10px;
    }
    &.active{
      color: $color-primary;
    }
  }
}
.popover{
  display: flex;
  justify-content: space-between;
  .item{
    color: rgba(0,0,0,0.45);
    text-align: center;
    cursor: pointer;
    padding: 26px 0;
    flex: 1;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    div:first-of-type{
      margin-bottom: 10px;
    }
    span{
      color: #0BAFB7;
      font-size: 16px;
      font-weight: 500;
    }
    &:hover{
      background: lighten( $color-primary, 53%);
    }
  }
}
</style>
