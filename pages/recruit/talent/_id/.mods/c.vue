<template>
  <div class="wrp">
    <div class="title">操作记录</div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.date">
        <div v-for="(item,index) in activity.children" :key="index" class="item">
          <span class="time">{{item.time}}</span> <span class="content">{{item.content}}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activities: [{
        date: '2018-06-14',
        children: [{
          content: '欧阳添加了雨员工-欧阳崔雪',
          time: '13:23',
        }, {
          content: '欧阳添加了雨员工-欧阳崔雪的基础信息',
          time: '14:33',
        }]
      }, {
        date: '2018-06-15',
        children: [{
          content: '欧阳添加了雨员工-欧阳崔雪的的教育经历',
          time: '09:00',
        }]
      }, {
        date: '2018-06-16',
        children: [{
          content: '欧阳上传了雨员工-欧阳崔雪的身份证原件',
          time: '13:23',
        }]
      }]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.wrp{
  padding: 16px 40px;
  .title{
    font-size:16px;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    margin-bottom: 16px;
  }
  /deep/{
    .el-timeline{
      padding-left: 90px;
    }
    .el-timeline-item__timestamp.is-bottom {
      margin-top: 8px;
      position: absolute;
      left: -90px;
      top: 3px;
      margin: 0;
      color:rgba(0,0,0,0.425);
    }
  }
  .item{
    margin: 0 0 16px;
    padding-top: 2px;
    .time{
      color:rgba(0,0,0,0.425);
    }
    .content{
      color:rgba(0,0,0,0.68);
    }
  }
}
</style>
