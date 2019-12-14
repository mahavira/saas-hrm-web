<template>
  <div :style="{height: height + 'px'}" class="sp-wave-svg">
    <div class="wave-svg-shape">
      <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" data-name="3-waves" viewBox="0 0 600 215.43"><path class="871c1787-a7ef-4a54-ad03-3cd50e05767a" d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z" transform="translate(-76 -985)" /></svg>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 72
    }
  }
}
</script>
<style lang="scss" scoped>
.sp-wave-svg{
  width: 100%;
  height: 72px;
  overflow: hidden;
  position: relative;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  .wave-svg-shape {
    position: absolute;
    top: 0;
    left: 0;
    width: 1260px;
    height: 100%;
    transform: translateX(-210px);

  }
  .wave-svg-shape .wave-svg {
    width: 100%;
    height: auto;
    overflow: hidden;
    fill: #D3F7F4;
    margin: 0;
    animation: wave-svg-anim 10s linear infinite;
  }
}
@keyframes wave-svg-anim {
  0% {
    transform: translateX(-210px);
  }
  100% {
    transform: translateX(210px);
  }
}
</style>
