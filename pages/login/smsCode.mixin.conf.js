const verifycodeRepeatDuration = 90

export default {
  data () {
    return {
      verifycodeRepeatDuration,
      verifycodeRepeat: false
    }
  },
  methods: {
    verifycodeRepeatFunc () {
      clearTimeout(this.verifycodeRepeatTimer)
      this.verifycodeRepeatTimer = setTimeout(() => {
        this.verifycodeRepeatDuration -= 1
        if (this.verifycodeRepeatDuration === 0) {
          this.resetRepeatTimer()
        } else {
          this.verifycodeRepeatFunc()
        }
      }, 1000)
    },
    resetRepeatTimer () {
      clearTimeout(this.verifycodeRepeatTimer)
      this.verifycodeRepeat = false
      this.verifycodeRepeatDuration = verifycodeRepeatDuration
    },
    fetchVerifycode () {
      this.$refs.form.validateField('mobile', (msg) => {
        if (!msg) {
          this.getVerifycode()
        }
      })
    },
    async getVerifycode () {
      if (!this.formData.mobile) { return }
      if (this.verifycodeRepeat) { return }
      this.verifycodeRepeat = true
      this.verifycodeRepeatFunc()
      try {
        const { data } = await this.$axios.post('/hrSms/send', {
          mobile: this.formData.mobile
        })
        if (data.status !== 0) {
          throw new Error(data.message)
        }
      } catch (e) {
        console.error(e)
        this.$notify.error(e.message || '获取验证码失败！')
        this.resetRepeatTimer()
      }
    }
  }
}
