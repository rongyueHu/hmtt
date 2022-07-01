<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--  <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <article-item
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
// 获取存储Dom
let ele = null
// 定义当前滑动的距离
let scrollTop = 0
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  data () {
    return {
      timestamp: Date.now,
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) { // 如果下拉刷新
        this.articleList = []// 列表清空
        this.refreshing = false// 结束下拉刷新状态
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据加载完毕，则将finished设置成true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将loading设置成false
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('触发')
      // 清空列表数据，防止用户把加载更多搞结束了
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true// 重新加载数据
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem },
  // 挂载钩子
  // 组件最终渲染成html dom ，$el就是渲染好的根标签
  // 操作dom时候用mounted
  mounted () {
    ele = this.$refs.pullrefresh.$el
    console.log(this.$refs.pullrefresh)
    // 获取滑动距离
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () { scrollTop = this.scrollTop })
  },
  activated () { // 在每次进入home页面的时候，把滚动条从最上面滚动到上一次记录的位置
    ele.scrollTop = scrollTop
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
