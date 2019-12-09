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
          <div v-for="(item,i) in day.list" :key="i" :style="{top: `${item.top}px`}" class="card">
            <div class="time">{{ item.time }}</div>
            <div class="name">{{ item.name }}</div>
            <div class="job"><i class="el-icon-s-custom" /> {{ item.job }}</div>
            <div class="phone"><i class="el-icon-mobile-phone" /> {{ item.phone }}</div>
            <div class="pr">{{ item.pr }} {{ item.top }}</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
const weekAlias = [ '一', '二', '三', '四', '五', '六', '日' ]
export default {
  props: {
    weekInx: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      weekAlias,
      data: [{
        dt: '2019-12-02 13:20',
        name: 'Joe Black',
        job: '应聘-架构师',
        phone: '19711962222',
        pr: '面试官-欧阳菲菲'
      }, {
        dt: '2019-12-05 8:00',
        name: 'Joe Black',
        job: '应聘-架构师',
        phone: '应聘-架构师',
        pr: '面试官-欧阳菲菲'
      }, {
        dt: '2019-12-07 14:00',
        name: 'Joe Black',
        job: '应聘-架构师',
        phone: '应聘-架构师',
        pr: '面试官-欧阳菲菲'
      }, {
        dt: '2019-12-08 9:00',
        name: 'Joe Black',
        job: '应聘-架构师',
        phone: '应聘-架构师',
        pr: '面试官-欧阳菲菲'
      }]
    }
  },
  computed: {
    weeks () {
      const sDay = this.weekInx * 7
      let weekOfday = parseInt(this.$moment().format('d'))
      if (weekOfday === 0) { weekOfday = 7 }
      const dayArray = []
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
          const dt = this.$moment(item.dt)
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
  .time{
    font-weight:500;
    padding: 10px 0 0 10px;
  }
  .name{
    font-size:16px;
    font-weight:500;
    padding: 10px 0 5px 15px;
  }
  .phone,.job{
    padding: 5px 0 5px 15px;
    font-size: 12px;
    color:rgba(0,0,0,0.4);
    i{
      color: $color-primary
    }
  }
  .pr{
    border-top: 1px solid rgba($color: #FFF, $alpha: 0.5);
    padding: 10px 0 10px 15px;
    font-size: 12px;
    color:rgba(0,0,0,0.4);
  }
}
.same{
  .card{
    background: $color-primary;
    color: #FFF;
    .phone,.job,.pr{
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
