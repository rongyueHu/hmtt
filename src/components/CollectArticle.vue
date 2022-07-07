<template>
  <van-loading v-if="isLoading" size="0.53333rem" />
  <van-icon
    v-else
    color="gold"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  name: 'CollectArticle',
  created () { },
  data () {
    return {
      isLoading: false // loading状态是否加载
    }
  },
  methods: {
    async onClick () {
      // 开始发送ajax
      this.isLoading = true
      // 获取target
      const target = this.$route.params.article_id
      if (this.is_collected) {
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) { console.log(err) }
      } else {
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) { console.log(err) }
      }
      // this.$emit('update:is_collected', !this.is_collected)
      // ajax结束了
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
