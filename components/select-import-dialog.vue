<template>
  <transition name="fade">
    <div v-if="visible" @click="$emit('update:visible', false)" class="select-dialog">
      <div v-for="(item,index) in items" :key="index" @click.stop="$emit('select', index)" class="item">
        <wave-svg :height="200" />
        <div class="wrp">
          <img v-if="index===0" src="~/assets/icon/scene_addstaff.png" alt="">
          <img v-else src="~/assets/icon/scene_modifyinformation.png" alt="">
          <h3 class="title">{{ item.title }}</h3>
          <p>{{ item.intro }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import WaveSvg from './wave-svg'
export default {
  components: { WaveSvg },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => [{
        title: '批量导入新增',
        intro: '适用于首次批量导入添加员工信息，支持导入在职，离职员工.'
      }, {
        title: '批量导入更新',
        intro: '适用于批量更新，修改系统已存在人员的信息.'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.select-dialog{
  position: fixed;
  left: 80px;
  top: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  .item{
    width: 300px;
    height: 300px;
    background:rgba(255,255,255,1);
    border-radius:10px;
    padding: 50px;
    margin: 0 10px;
    color: rgba(0, 0, 0, 0.85);
    position: relative;
    cursor: pointer;
    .wrp{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    img{
      width: 180px;
      height: 180px;
    }
    p{
      color:rgba(0,0,0,0.85 * 0.5);
      line-height: 22px;
      text-align: center;
    }
  }
}
</style>
