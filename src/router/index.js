import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
]

const router = new VueRouter({
  routes,
  mode:'history',
  base:'/pdmkanban'
})

export default router
