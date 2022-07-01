<template>
  <div>
    <!-- 登陆后 -->
    <div class="header header-login" v-if="user && user.token">
      <!-- 头像 -->
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <!-- 信息 -->
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <!-- 收藏/历史 -->
    <van-grid :column-num="2">
      <van-grid-item text="收藏"
        ><template #icon><i class="toutiao toutiao-shoucang"></i></template
      ></van-grid-item>
      <van-grid-item text="历史"
        ><template #icon><i class="toutiao toutiao-lishi"></i></template
      ></van-grid-item>
    </van-grid>
    <!-- 消息通知 小智同学 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出登录 -->
    <van-button type="default" block v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
// mapState,mapGetters-->computed
// mapMulption,mapAction-->method
import { mapState } from 'vuex'
export default {
  name: 'My',
  /* 登录页面立即出现 */
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res9', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    /* 退出登录 */
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '大帝',
          message: '确认退出嘛'
        })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background-color: #3296fa;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  .inner {
    img {
      width: 132px;
      height: 132px;
      background-color: #ffffff;
      border: solid 2px #ffffff;
      border-radius: 50%;
    }
    p {
      font-family: MicrosoftYaHei;
      font-size: 28px;
      font-weight: normal;
      color: #ffffff;
      padding: 0px;
      margin: 0;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      text-align: center;
      line-height: 33px;
      background-color: #fff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
        margin-left: 22px;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        font-weight: normal;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.van-button {
  color: #d86262;
  font-size: 30px;
}
</style>
