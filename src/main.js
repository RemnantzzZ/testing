import Vue from 'vue'
import router from './router'
import store from './store'
import {Button,Dropdown,Menu,Row,Col,Card,Icon,Tabs,Table,Pagination,Empty,Progress,Message,BackTop,Form,Input} from 'ant-design-vue'
import App from './App.vue'
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
import './icons'


Vue.prototype.$axios = axios
Vue.prototype.$qs=qs
Vue.prototype.$echarts = echarts
Vue.use(Menu)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Empty)
Vue.use(Progress)
Vue.use(Message)
Vue.use(BackTop)
Vue.use(Form)
Vue.use(Input)


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
