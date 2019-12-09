<template lang="pug">
.el-container.is-vertical
  .sp-tabs__three
    nuxt-link(
      v-for="item in tabs",
      :key="item.name",
      :to="`/${prefix}/${item.path}`",
      :class="{active: item.name===active}",
      class="el-link item"
    )
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
  &__three{
    padding: 36px 24px 0;
    position: relative;
    bottom: -8px;
    .item{
      font-size: 14px;
      font-weight:400;
      color:rgba(0,0,0,0.45);
      line-height: 28px;
      padding: 0 32px;
      position: relative;
      &:before{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
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
}
</style>
