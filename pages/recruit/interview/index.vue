<template>
  <div>
    <div class="sp-filter is-white-bg">
      <div class="sp-date-selection">
        <div @click="onWeek(-1)" class="handle-left">
          <i class="el-icon-arrow-left" />
        </div>
        <div class="handle-center">{{ date }}</div>
        <div @click="onWeek(1)" class="handle-right">
          <i class="el-icon-arrow-right" />
        </div>
        <el-input
          v-model="keyword"
          @keyup.enter.native="onSearch"
          style="margin-left:10px;"
          placeholder="请输入姓名搜索"
          size="small"
        >
          <el-button slot="append" @click="onSearch" icon="el-icon-search" />
        </el-input>
      </div>
      <div class="handler">
        <el-button @click="onAdd" type="default" class="is-shadow" size="small"><i class="icon-ico_calendar is-primary" /> 安排面试</el-button>
      </div>
    </div>
    <timeline :weekInx="weekInx" :data="data" />
  </div>
</template>
<script>
import Timeline from './-timeline'
import { DATE_TIME_PICKER, SELECT, INPUT } from '~/constant/FORMITEM_TYPE'
export default {
  components: { Timeline },
  data () {
    return {
      keyword: '',
      weekInx: -10,
      data: []
    }
  },
  computed: {
    date () {
      return `${this.startDate.format('MM月DD日')}—${this.endDate.format('MM月DD日')}`
    },
    startDate () {
      const sDay = this.weekInx * 7
      let weekOfday = parseInt(this.$moment().format('d'))
      if (weekOfday === 0) { weekOfday = 7 }
      return this.$moment().add(sDay - weekOfday + 1, 'd')
    },
    endDate () {
      const sDay = this.weekInx * 7
      let weekOfday = parseInt(this.$moment().format('d'))
      if (weekOfday === 0) { weekOfday = 7 }
      return this.$moment().add(sDay - weekOfday + 7, 'days')
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      try {
        const { data } = await this.$axios.post('/hrInterviewArrange/list', {
          limit: 999,
          page: 1,
          searchText: this.keyword,
          startDate: this.startDate.format('YYYY-MM-DD'),
          endDate: this.endDate.format('YYYY-MM-DD')
        })
        if (data.status === 200) {
          this.data = data.data.rows
        }
      } catch (e) {
        console.error(e)
      }
    },
    onSearch () {
      this.fetch()
    },
    onAdd (item) {
      this.$bus.$emit('dialog:form', {
        title: '安排面试',
        fields: {
          talentId: {
            label: '候选人',
            formType: SELECT,
            options: {}
          },
          interviewManager: {
            label: '面试官',
            formType: SELECT,
            options: {}
          },
          interviewAssist: {
            label: '其他面试官',
            formType: SELECT,
            options: {}
          },
          interviewTime: {
            label: '面试时间',
            formType: DATE_TIME_PICKER
          },
          interviewType: {
            label: '面试方式',
            formType: SELECT,
            options: {
              1: '现场面试',
              2: '电话面试'
            }
          },
          interviewInfo: {
            label: '面试信息',
            formType: INPUT
          },
          sendType: {
            label: '通知候选人',
            formType: SELECT,
            options: {
              0: '短信',
              1: '邮件'
            }
          }
        },
        url: '/hrInterviewArrange/addinterviewplan',
        mode: 'single',
        labelWidth: 100
      })
    },
    onWeek (e) {
      this.weekInx = this.weekInx + e
      this.fetch()
    }
  }
}
</script>
<style lang="scss" scoped>
.search{
  margin-left: 30px;
}
</style>
