import axios from 'axios'
import store from '../store'
import router from '../router'

const service =axios.create({
  baseURL:process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : '',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout:5000
})

service.interceptors.request.use(
  config=>{
    if (store.state.app.userInfo) {
      config.headers['Authorization'] = store.state.app.userInfo.AToken
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const data = response.data
    return data
  },
  error => {
    const code = error.response.status
    const data = error.response.data
    if (code === 401) {
      if (router.history.current.fullPath !== '/login') {
        router.push({ path: '/login' })
      }
    } else {
      return Promise.reject(new Error(data.error || data || 'Error'))
    }
  }
)
export default service