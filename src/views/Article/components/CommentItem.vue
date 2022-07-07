<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <!-- 点赞数如果大于0，就显示点赞数量，否则就显示赞 -->
    <!-- 如果有点赞，图标颜色变红，并且样式更换为实心 -->
    <!-- 给点赞绑定事件 -->
    <van-loading v-if="isLoading" />
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="onClick"
    >
      {{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
// 导入api
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      // 如果有点赞
      if (this.item.is_liking) {
        // 取消点赞
        try {
          await delLike(this.item.com_id)
          // 如果取消点赞，则点赞数量减一，点赞状态取消
          this.item.like_count--
          this.item.is_liking = false
        } catch (err) { console.log(err) }
      } else {
        // 点赞
        try {
          await addLike(this.item.com_id)
          this.item.like_count++
          this.item.is_liking = true
        } catch (err) { console.log(err) }
      }
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
