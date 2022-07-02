<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false // 清空列表数据
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log('res1', res)
        // 数据加载完了,将finished变为true，显示没有更多了
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 新旧数据要合并在一起而不是把新数据去覆盖旧的数据
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) { console.log(err) }
    },
    // 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。此时可以发起异步操作并更新数据
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      // 清空列表数据
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>
<style scoped lang='less'>
//子容器内容高度要比父容器高度要高的时候就会有滚动条
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
