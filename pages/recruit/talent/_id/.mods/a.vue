<template>
  <div class="wrp">
    <div v-for="(item,key) in conf" :key="key" class="block">
      <div class="title">
        <div>{{ item.label }}</div>
        <i v-if="!item.edited" @click="onEdit(item, key)" class="icon-ico_edit is-primary" />
      </div>
      <div class="form">
        <sp-form :fields="item.fields" :rules="{}" :value="data[key]" :edited="item.edited" mode="double" />
        <transition name="slide-left-fade">
          <div v-if="item.edited" class="footer">
            <el-button @click="item.edited=false" type="default" size="small">取消</el-button>
            <el-button type="primary" size="small">保存</el-button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import conf from './a'
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
    onEdit (item, index) {
      item.edited = true
    },
  }
}
</script>
