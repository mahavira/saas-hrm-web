<template>
  <div class="header">
    <div class="item is-primary">
      在职 <span class="num is-primary">9 人</span>
    </div>
    <div class="item">
      全职 <span class="num">9</span> 人
      <el-popover
        placement="bottom"
        trigger="hover"
        width="432"
      >
        <div class="popover">
          <div class="item">
            <div>全职</div>
            <div><span>103</span> 人</div>
          </div>
          <div class="item">
            <div>实习生</div>
            <div><span>34</span> 人</div>
          </div>
          <div class="item">
            <div>劳务派遣</div>
            <div><span>3</span> 人</div>
          </div>
          <div class="item">
            <div>退休返聘</div>
            <div><span>11</span> 人</div>
          </div>
        </div>
        <i slot="reference" class="el-icon-caret-bottom" />
      </el-popover>
    </div>
    <div class="item">
      试用期 <span class="num">9</span> 人
    </div>
    <div class="item">
      待入职 <span class="num">9</span> 人
    </div>
    <div class="item">
      待离职 <span class="num">9</span> 人
    </div>
  </div>
</template>
<script>
export default {
  props: {
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/var.scss';
.header{
  padding: 28px 24px 20px;
  .item{
    display: inline-block;
    font-size: 14px;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height: 28px;
    padding: 0 32px;
    margin: 5px 0;
    position: relative;
    .num{
      font-size: 16px;
      color: #0BAFB7;
      display: inline-block;
      text-align: right;
      min-width: 38px;
    }
    &.is-primary{
      padding-left: 0;
      .num{
        font-size: 32px;
        min-width: 80px;
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
    &.active{
      color: $color-primary;
    }
  }
}
.popover{
  display: flex;
  justify-content: space-between;
  .item{
    padding: 10px 22px;
    color: rgba(0,0,0,0.45);
    text-align: center;
    cursor: pointer;
    div:first-of-type{
      margin-bottom: 10px;
    }
    span{
      color: #0BAFB7;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
