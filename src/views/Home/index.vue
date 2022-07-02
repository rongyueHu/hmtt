<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button to="/search" icon="search" type="info" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 组件 -->
        <article-list :id="item.id"></article-list
      ></van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isChannelPanelShow"
      :style="{ height: '100%', paddingTop: '1rem' }"
      position="bottom"
    >
      <!--选中高亮  面板隐藏 -->
      <!-- $event自定义对象，子向父传的值 -->
      <!-- $event内置对象， -->
      <channel-panel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      >
      </channel-panel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home.js'
import ArticleList from '@/components/ArticleList.vue'
import ChannelPanel from './components/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 三种情况
    // 一是没有登录 地图一次安装好APP，第一次打开的时候 只能去ajax中拿
    // 二是没有登录 但是第二次打开，有可能频道别使用编辑或者删除过，这样的话本地存储就有值，从本地存储拿
    // 三是登录过，直接从ajax拿，
    // 先判断token如果有token 去ajax中拿 然后再判断本地存储有没有channels数据，如果没有就从ajax中拿 否则从本地存储拿
    // 只要本地存储有数据并且没有登录 就从本地存储中拿，否则从ajax中拿
    async getMyChannels () {
      // 匹配的是未登录并且本地存储没有数据的情况
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          console.log(res.data.data.channels[0].name)
          this.channels = res.data.data.channels // 将后台数据给到channels
        } catch (err) { console.log(err) }
      }
    }
  },
  computed: {},
  filters: {},
  components: { ArticleList, ChannelPanel }
}

</script>

<style scoped lang='less'>
/* opticy:容易出错，使用rgba */
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  //unset:把本来设置的属性去掉
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 32px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
