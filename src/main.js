import Vue from 'vue'
import router from './router'
import store from './store'
import {Button,Dropdown,Menu,Row,Col,Card,Icon,Tabs,Table,Pagination,Empty,Progress} from 'ant-design-vue'
import App from './App.vue'
import echarts from 'echarts'
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



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
