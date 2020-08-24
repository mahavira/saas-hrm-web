<template>
  <div>
    <div v-for="(dialog, name) in dialogs" :key="name">
      x
    </div>
  </div>
</template>
<script>
const names = []
const requireContextsvg = require.context('../../pages', true, /\.dialog.vue$/)
requireContextsvg.keys().forEach((key) => {
  console.log(key)
  const name = key.replace(/^\.\//, '').replace(/\.dialog.vue$/, '')
  names.push(name)
})

console.log(names)

export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
