<template>
  <div class="wrp">
    <div v-for="(item,key) in conf" :key="key" class="block">
      <div class="title">
        <div>{{ item.label }}</div>
        <a class="is-primary">
          <i @click="onImport(item, key)" class="icon-ico_export" />
          导出
        </a>
      </div>
      <div class="form">
        <sp-form :fields="item.fields" :rules="{}" :value="data[key]" :edited="false" mode="double" />
      </div>
    </div>
  </div>
</template>
<script>
import conf from './g'
import SpForm from '~/components/sp-form'
export default {
  components: { SpForm },
  data () {
    console.log(conf)
    return {
      conf,
      data: {
        info: {
          staffId: '调岗',
          education: '2019-01-10',
          graduatedSchool: '',
          graduationMajor: '总经理',
          graduationMajor2: ''
        }
      }
    }
  },
  created () {
  },
  methods: {
    onImport () {}
  }
}
</script>
<style scoped lang="scss">
.title{
  a{
    font-size:14px;
  }
}
</style>
