<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    show-word-limit
    center
    ref="field"
    ><template #extra>
      <!-- 当输入框没有内容时候，按钮就应该是被禁用的 -->
      <van-button
        :disabled="message.length.length === 0"
        type="default"
        @click="onClick"
        >发布</van-button
      ></template
    ></van-field
  >
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    // 如果是对文章进行评论不用传，对评论进行评论要传
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) { console.log(err) }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
button {
  border: none;
}
</style>
