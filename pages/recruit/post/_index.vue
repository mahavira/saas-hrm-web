<template>
  <div>
    <table-container ref="tableContainer" />
  </div>
</template>

<script>
import TableContainer from '~/components/table-container'

export default {
  components: { TableContainer },
  data () {
    return {
      dialogStopRecruit: false
    }
  },
  mounted () {
  },
  methods: {
    onStopRecruit () {
      this.dialogStopRecruit = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
