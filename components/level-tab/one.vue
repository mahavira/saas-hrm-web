<template lang="pug">
.el-container.is-relative
  .sp-tabs__one(v-if="tabs.length")
    nuxt-link(v-for="item in tabs", :key="item.name", :to="`/${prefix}/${item.path}`", :class="{active: item.name===active}", class="el-link item")
      span {{item.label}}
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
  &__one{
    position: absolute;
    left: 0;
    top: -56px;
    overflow: hidden;
    .item{
      color: #FFF;
      font-size: 18px;
      height: 46px;
      padding: 10px 28px 10px 30px;
      box-sizing: border-box;
      line-height: 1;
      margin-right: 12px;
      font-weight: 400;
      position: relative;
      transition: color 0.3s;
      margin-top: 10px;
      min-width: 130px;
      span{
        position: relative;
      }
      &::before, &::after{
        content: '';
        background: #fff;
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
        right: 0px;
        top: -2px;
        width: 22px;
        height: 129%;
        border-radius: 25px;
        transform: translateY(100%) rotate(0deg) ;
        transform-origin: right top;
      }
      &.active{
        color: #000;
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
