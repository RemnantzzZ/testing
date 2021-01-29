import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes,
  mode:'history',
  base:'/pdmkanban'
})

export default router
