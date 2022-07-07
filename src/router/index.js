import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'// 父页面不用懒加载
const Home = () => import('@/views/Home')// 首页   以下为懒加载写法
const My = () => import('@/views/My')// 我的
const Question = () => import('@/views/Question')// 问答
const Video = () => import('@/views/Video')// 视频
const Login = () => import('@/views/Login')// 登录
const Search = () => import('@/views/Search')// 搜索
const Article = () => import('@/views/Article')// 详情页
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  {
    path: '/login', component: Login
  }, {
    path: '/search', component: Search
  }, {
    path: '/article/:article_id', component: Article, name: 'article', props: true // 解耦，params相关的路由加props可以让路由和组件解耦
  }
]

const router = new VueRouter({
  routes
})

export default router
