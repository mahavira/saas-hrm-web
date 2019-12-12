<template>
  <transition name="fade">
    <div v-if="visible" @click="$emit('update:visible', false)" class="select-dialog">
      <div @click.stop="$emit('select', 0)" class="item">
        <div class="sp-wave-svg" style="height:180px;">
          <div class="wave-svg-shape">
            <svg id="738255fe-a9fa-4a5e-963a-8e97f59370ad" class="wave-svg" xmlns="http://www.w3.org/2000/svg" data-name="3-waves" viewBox="0 0 600 215.43"><path class="871c1787-a7ef-4a54-ad03-3cd50e05767a" d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z" transform="translate(-76 -985)" /></svg>
          </div>
        </div>
        <div class="wrp">
          <img src="~/assets/icon/scene_addstaff.png" alt="">
          <h3 class="title">批量导入新增</h3>
          <p>适用于首次批量导入添加员工信息，支持导入在职，离职员工.</p>
        </div>
      </div>
      <div @click.stop="$emit('select', 1)" class="item">
        <div class="sp-wave-svg" style="height:180px;">
          <div class="wave-svg-shape">
            <svg id="738255fe-a9fa-4a5e-963a-8e97f59370ad" class="wave-svg" xmlns="http://www.w3.org/2000/svg" data-name="3-waves" viewBox="0 0 600 215.43"><path class="871c1787-a7ef-4a54-ad03-3cd50e05767a" d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z" transform="translate(-76 -985)" /></svg>
          </div>
        </div>
        <div class="wrp">
          <img src="~/assets/icon/scene_modifyinformation.png" alt="">
          <h3 class="title">批量导入更新</h3>
          <p>适用于批量更新，修改系统已存在人员的信息.</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
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
