<template>
  <!-- 关注 -->
  <van-button
    :loading="isAjax"
    :disabled="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :plain="value"
    :icon="value ? '' : 'plus'"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}
  </van-button>
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  name: 'FollowUser',
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      // 如果当前已关注则取消此接口
      if (this.value) { // value为true
        try {
          await delUser(this.target) // 取消此参数
          this.$emit('input', !this.value)
        } catch (err) { console.log(err) }
      } else {
        try {
          await addUser(this.target) // 添加此参数
          this.$emit('input', !this.value)
        } catch (err) { console.log(err) }
      }
      this.isAjax = false
      // this.$emit('input', !this.value)
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
