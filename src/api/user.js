import request from '@/utils/request' // 导入request,axios实例
export const getSmsCode = (mobile) => { // 对外暴露
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *
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
