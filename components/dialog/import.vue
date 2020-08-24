<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    :width="width+'px'"
  >
    <div class="el-container is-justify-space-around" style="padding:40px 60px 80px">
      <slot />
    </div>
    <wave-svg />
  </el-dialog>
</template>
<script>

export default {
  components: { WaveSvg: import('~/components/wave-svg') },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    width: { type: Number, default: 820 }
  },
  data () {
    return {
      show: this.visible
    }
  },
  watch: {
    visible (val) {
      this.show = val
    },
    show (val) {
      if (!val) { this.$emit('update:visible', val) }
    }
  }
}
</script>
