import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
/* import 'vant/lib/index.css' */
// 引入全部样式
import 'vant/lib/index.less'
import 'amfe-flexible'
/* import '@/styles/icon.less' */
import MyIcon from '@/components/MyIcon.vue'
/* import '@/styles/reset.less' */
import '@/styles/index.less'
// 一次性把filters/index.js中所有的按需导出全部导出来
// 作为obj的属性
// 1.批量创建过滤器
// 2.好处：创建新的过滤器
// 代码会变简单，只要写一个普通函数并且按需导出
import * as obj from '@/filters'
import '@/components'
import FollowUser from '@/components/FollowUser.vue'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component(' MyIcon,', MyIcon)
Vue.config.productionTip = false

Vue.use(Vant)
Vue.component(FollowUser.name, FollowUser)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
