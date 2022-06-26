<template>
  <div>
    <!-- 登录 -->
    <van-nav-bar title="登录">
      <!--   <van-icon name="cross" slot="left"/> -->
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- form表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '号码格式不正确' },
        ]"
      >
        <!-- icon->手机图标 -->
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '号码格式不正确,验证码的长度必须是6位',
          },
        ]"
      >
        <!-- icon->验证码图标 -->
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
          />
          <!-- 发送验证码 -->
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录 -->
      <div style="margin: 16px">
        <van-button block native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
// on开头的都是事件回调函数的名字
export default {
  created () { },
  data () {
    return {
      mobile: '18888888888', // 手机号
      code: '246810', // 验证码
      time: 5 * 1000, // 倒计时5*1000ms=5s
      isCountDownShow: false// 默认不显示倒计时效果
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // res.data.data
        // token有效期 2个小时 两种思路 让用户重新登录 refresh_token
        this.$store.commit('setUser', res.data.data)
        // console.log('登录成功')
      } catch (err) { console.log(err) }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        console.log('校验通过')
        this.isCountDownShow = true// 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // 轻提示
        this.$toast.fail('手机号码格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.van-button__text {
  zoom: 0.95;
}
.yzm {
  position: fixed;
  right: 18px;
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
