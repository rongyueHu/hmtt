<template>
  <div>
    <!-- 模板中不能有太多的逻辑 -->
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left><van-icon name="cross" /></template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        round
        plain
        type="primary"
        block
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- 新添加评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow"
      ><Addcomment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></Addcomment
    ></van-popup>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
import Addcomment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      console.log('123')
      try {
        const res = await getCommentList({
          type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit
        })
        console.log('3', res)
        this.list = res.data.data.results
      } catch (err) { console.log('4', err) }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, Addcomment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-top: 92px;
}
.bottom {
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
