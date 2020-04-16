<template>
  <div class="sp-container" style="height:0">
    <div class="header">
      <div v-for="(day,index) in weeks" :key="index" :class="day.status" class="day">
        <div>{{ day.date }}</div>
        <div>周{{ weekAlias[index] }}</div>
      </div>
    </div>
    <el-scrollbar class="is-vertical" style="flex:1">
      <div class="el-container">
        <div class="time-part">
          <div class="item">8:00</div>
          <div class="item">上午</div>
          <div class="item">12:00</div>
          <div class="item">下午</div>
          <div class="item">18:00</div>
          <!-- <div class="item">晚上</div> -->
        </div>
        <div v-for="(day,index) in weeks" :key="index" :class="day.status" class="day-item">
          <div
            v-for="(item,i) in day.list"
            :key="i"
            :style="{top: `${item.top}px`}"
            @click="onActive(item)"
            :class="{active: active.interviewPlanId===item.interviewPlanId}"
            class="card"
          >
            <div class="time">{{ item.time }}</div>
            <div class="name">{{ item.talentName }}</div>
            <div class="item"><i class="icon-ico_occupation" /> {{ item.interviewInfo }}</div>
            <div class="item"><i class="icon-ico_iphone" /> {{ item.phone || '-' }}</div>
            <div v-if="active.interviewPlanId===item.interviewPlanId" class="item">面试官: {{ item.interviewManager || '/' }}</div>
            <div class="footer">
              <div v-if="active.interviewPlanId!==item.interviewPlanId" class="item">面试官: {{ item.interviewManager || '/' }}</div>
              <div v-if="active.interviewPlanId===item.interviewPlanId" class="el-container is-justify-space-between">
                <div>
                  <el-button @click="onUpdateInterview" icon="icon-ico_edit" circle size="mini" />
                </div>
                <div>
                  <el-button @click="onUpdateInterview(item)" size="mini">修改面试时间</el-button>
                  <el-button @click="onCloseInterview(item)" size="mini">取消面试</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { TEXTAREA, DATE_TIME_PICKER, TEXT, SELECT } from '~/constant/FORMITEM_TYPE'

const weekAlias = [ '一', '二', '三', '四', '五', '六', '日' ]
export default {
  props: {
    weekInx: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      weekAlias,
      active: {}
    }
  },
  computed: {
    weeks () {
      const sDay = this.weekInx * 7
      const dayArray = []
      let weekOfday = parseInt(this.$moment().format('d'))
      if (weekOfday === 0) { weekOfday = 7 }
      for (let d = 1; d <= 7; d += 1) {
        const current = this.$moment().subtract(weekOfday - d - sDay, 'days')
        let status = 'same'
        if (current.isBefore(this.$moment(), 'day')) {
          status = 'before'
        } else if (current.isAfter(this.$moment(), 'day')) {
          status = 'after'
        }
        const list = []
        this.data.forEach((item) => {
          const dt = this.$moment(item.interviewTime)
          if (dt.isSame(current, 'day')) {
            list.push(Object.assign({
              top: (dt.hours() - 8) * 140 / 2,
              time: dt.format('HH:mm')
            }, item))
          }
        })
        dayArray.push({
          status,
          date: current.format('MM月DD日'),
          list
        })
      }
      return dayArray
    }
  },
  mounted () {
  },
  methods: {
    onActive (item) {
      this.active = item
    },
    onCloseInterview (item) {
      this.$bus.$emit('dialog:form', {
        title: '取消面试',
        fields: {
          sendType: {
            label: '取消原因',
            formType: TEXTAREA,
            isTopAlign: true
          }
        },
        data: {
          sendType: '',
          hrInterviewPlanId: item.interviewPlanId
        },
        url: '/hrInterviewArrange/cancel',
        mode: 'single',
        labelWidth: 70
      })
    },
    onUpdateInterview (item) {
      this.$bus.$emit('dialog:form', {
        title: '修改面试时间',
        fields: {
          currentTime: {
            label: '当前面试时间',
            formType: TEXT
          },
          interviewTime: {
            label: '修改时间',
            formType: DATE_TIME_PICKER
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
        data: {
          currentTime: item.interviewTime,
          sendType: '',
          interviewTime: '',
          hrInterviewPlanId: item.interviewPlanId
        },
        url: '/hrInterviewArrange/updateinterviewplan',
        mode: 'single',
        labelWidth: 100
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/var.scss';
.sp-container{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.header{
  display: flex;
  .day{
    font-weight:800;
    color:rgba(0,0,0,0.5);
    line-height:22px;
    padding: 7px 0;
    flex: 1;
    text-align: center;
    &.same{
      color: $color-primary;
    }
    &:first-of-type{
      margin-left: 100px;
    }
  }
}
.time-part{
  width: 100px;
  .item{
    height: 140px;
    text-align: center;
    font-weight:800;
    color:rgba(0,0,0,0.5);
    &:nth-of-type(2n) {
      color:rgba(0,0,0,0.25);
    }
  }
}
.day-item{
  flex: 1;
  background: rgba($color: #000000, $alpha: 0.02);
  margin: 0 2px;
  position: relative;
}
.card{
  background:rgba(235,235,235,1);
  border-radius:10px;
  position: absolute;
  width: calc(100% - 10px);
  margin-left: 5px;
  color:rgba(0,0,0,0.85);
  cursor: pointer;
  .time{
    font-weight:500;
    padding: 10px 0 0 10px;
  }
  .name{
    font-size:16px;
    font-weight:500;
    padding: 10px 0 5px 15px;
  }
  .item{
    padding: 5px 0 5px 15px;
    font-size: 12px;
    color:rgba(0,0,0,0.4);
    i{
      color: $color-primary
    }
  }
  .footer{
    border-top: 1px solid rgba($color: #FFF, $alpha: 0.5);
    padding: 10px 15px;
    font-size: 12px;
    color:rgba(0,0,0,0.4);
  }
  &.active{
    width: calc(200% - 10px);
    z-index: 99;
  }
}
.same{
  .card{
    background: $color-primary;
    color: #FFF;
    .item{
      color: #FFF;
      i{
        color: #FFF;
      }
    }
  }
}
.after{
  .card{
    background:rgba(255,241,216,1);
  }
}
</style>
