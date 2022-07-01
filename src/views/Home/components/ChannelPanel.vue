<template>
  <div>
    <div class="cannel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          @click="
            {
              isCloseShow = !isCloseShow;
            }
          "
          round
          size="mini"
          plain
          type="danger"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <!-- 循环 样式动态绑定 -->
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'red' : 'pink' }"
            @click="onClick(index)"
          >
            {{ item.name
            }}<van-icon
              v-show="isCloseShow"
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="cannel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div @click="add(item.id)" class="inner van-ellipsis">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllAricleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPannel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllAricleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) { console.log(err) }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    async add (id) {
      // 获取点击的索引
      const index = await this.recommendChannels.findIndex(item => item.id === id)
      // 在channels最后面添加
      this.channels.push(this.recommendChannels[index])
      // recommendChannels中根据点击的索引值，将对应的删除
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      // 如果是删除按钮
      if (this.isCloseShow) {
        // 删除
        // 将选中索引号的按钮定义变量
        const obj = this.channels[index]
        if (index === 0) { // 推荐不能删除，所以要排除掉
          return
        }
        // 将面板中，选中的那个删除
        this.channels.splice(index, 1)
        // 将选中删除那个添加到公共面板最后面
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      // 登陆过 把持久化放在后台服务器（ajax） 未登录把信息放在本地存储
      // 对channels进行深度监听
      deep: true, // 深度监听
      async handler (newVal) {
        console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) { // 登陆过
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 先把频道数据处理一下
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.cannel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 26px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: normal;
  line-height: 86px;
  text-align: center;
  color: #222;
  margin-left: 14px;
  margin-bottom: 20px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
