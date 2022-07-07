import request from '@/utils/request'
/**
 *根据id查文章
 * @param {*} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
/**
 *取消用户
 * @param {用户id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
/**
 *添加用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}
/**
 *收藏文章
 * @param {收藏的目标文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}
/**
 *取消文章
 * @param {收藏的目标文章id} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
/**
 *点赞文章
 * @param {文章id} target
 * @returns
 */
export const addSupport = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: {
      target
    }
  })
}
/**
 *取消文章点赞
 * @param {文章id} target
 * @returns
 */
export const delSupport = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
