import request from '@/utils/request' // 导入request,axios实例
/* 验证码 */
export const getSmsCode = (mobile) => { // 对外暴露
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *登录信息
 * @param {mobile,code} param0
 * @return promise
 */
export const login = ({ mobile, code }) => { // 解构赋值
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
