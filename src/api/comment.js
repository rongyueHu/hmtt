import request from '@/utils/request'
/**
 *@param type评论类型，a-对文章（article）的评论，c-对（comment的回复）
 * @param source 源id,文章id或评论id
 * @param offset 获取评论数据的偏移量
 * @param type
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type, source, offset, limit
    }
  })
}
/**
 *
 * @param {点赞的评论id} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
/**
 *
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}
/**
*target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论）content 内容   art_id?文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
