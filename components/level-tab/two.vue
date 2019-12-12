<template lang="pug">
div
  .sp-tabs__two(v-if="tabs.length")
    nuxt-link(
      v-for="item in tabs",
      :key="item.name",
      :to="`/${prefix}/${item.path}`",
      :class="{active: item.name===active}",
      class="el-link item"
    )
      span {{ item.label }}
  el-scrollbar.is-vertical.sp-fixed-height__two
    slot
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    prefix: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
@import '~/assets/var.scss';
.sp-tabs{
  &__two{
    overflow: hidden;
    background: #FFF;
    padding: 16px 16px 0;
    box-shadow: 1px 5px 5px 1px $bgcolor-primary;
    z-index: 1;
    position: relative;
    .item{
      color: rgba(0,0,0,0.5);
      font-size: 14px;
      padding: 16px 18px 16px 24px;
      box-sizing: border-box;
      line-height: 1;
      margin-right: 10px;
      font-weight: 400;
      position: relative;
      transition: color 0.3s;
      min-width: 98px;
      span{
        position: relative;
      }
      &::before, &::after{
        content: '';
        background: $bgcolor-primary;
        visibility: hidden;
        position: absolute;
        transition: all 0.3s cubic-bezier(.25,.1,.3,1.5);
      }
      &::before{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        left: 0;
        bottom: -20%;
        width: 100%;
        height: 120%;
        transform: translateY(100%);
      }
      &::after{
        right: 1px;
        top: -2px;
        width: 22px;
        height: 129%;
        transform: translateY(100%) rotate(-12deg);
        transform-origin: right top;
        border-radius: 25px;
      }
      &.active{
        color: #000;
        font-weight: 500;
        &::before{
          visibility: visible;
          transform: translateY(0);
        }
        &::after{
          visibility: visible;
          transform:  translateY(0) rotate(-12deg);
        }
      }
    }
  }
}
</style>
