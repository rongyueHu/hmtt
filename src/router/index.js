import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'// 父页面不用懒加载
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Video = () => import('@/views/Video')
const Login = () => import('@/views/Login')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
