import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'// 根据需要加载语言环境
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')// 语言配置改为中文
dayjs.extend(relativeTime)// 时间到当前
// dateformat 过滤器名称
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
