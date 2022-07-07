<template>
  <!-- 点赞 -->
  <van-loading v-if="isLoading" size="0.53333rem" />
  <van-icon
    v-else
    @click="onClick"
    color="#777"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
  />
</template>

<script>
import { addSupport, delSupport } from '@/api/article'
export default {
  name: 'SupportArticle',
  props: {
    attitude: { // 值
      type: [Number, Boolean],
      required: true
    }
  },
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
      if (this.attitude === 1) {
        // 点赞，取消点赞
        try {
          await delSupport(target)
          const status = -1
          this.$emit('update:attitude', status)
        } catch (err) { console.log(err) }
      } else {
        try {
          await addSupport(target)
          const status = 1
          this.$emit('update:attitude', status)
        } catch (err) { console.log(err) }
      }
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
