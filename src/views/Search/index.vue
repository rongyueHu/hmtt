<template>
  <div>
    <form action="/">
      <van-search
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <!-- 搜索历史 -->
    <!-- 当搜索框是空的时候，显示搜索历史 -->
    <!-- 当搜索框中有值的时候，显示搜索建议，当回车时候显示搜索结果 -->
    <search-histroy
      v-if="searchText === ''"
      @search="onSearch"
    ></search-histroy>
    <template v-else>
      <!-- 搜索结果 -->
      <search-result v-if="isSearch" :searchText="searchText"></search-result>
      <!-- 搜索建议 -->
      <search-suggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></search-suggest>
    </template>
  </div>
</template>
<script>
import SearchHistroy from './commponents/SearchHistroy.vue'
import SearchResult from './commponents/SearchResult.vue'
import SearchSuggest from './commponents/SearchSuggest.vue'

export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有回车
    }
  },
  methods: {
    // 想实现的需求：在搜索input回车的时候给搜索建议单元格点击的时候
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistroy, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
</style>
