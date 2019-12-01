<template>
  <div class="el-container is-vertical">
    <t-header />
    <t-container />
  </div>
</template>
<script>
import THeader from './-header'
import TContainer from './-container'

export default {
  components: { THeader, TContainer },
  data () {
    return {
    }
  },
  methods: {
    toInfo (e) {
      this.$router.push(`/personnel/manage/roster/${e.currentRow.educationInfoId}`)
    }
  }
}
</script>
