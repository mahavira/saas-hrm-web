import { Message, MessageBox, Notification } from 'element-ui'
function remove (url, formdata = {}, success = '已删除！', error = '删除失败！') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await this.$axios.post(url, formdata)
      if (data.status === 200 || data.status === 0) {
        Notification.success(success)
        resolve()
      } else {
        throw new Error(data.message)
      }
    } catch (e) {
      Message.error({ message: e.message || e || error, showClose: true })
    }
  })
}
function confirm (message = '是否确认删除该条数据？', title = '删除') {
  return new Promise(async (resolve, reject) => {
    await MessageBox.confirm(message, title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    resolve()
  })
}

export default (ctx, inject) => {
  inject('request', {
    delete: remove.bind(ctx),
    confirm
  })
}
