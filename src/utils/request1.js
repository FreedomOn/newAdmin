import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message,
} from 'element-ui'



// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 200000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {

    NProgress.done()

    if (response.status == 500) {
      Message({
        message: '服务器维修中，请联系开发人员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }

    if (response.status == 200) {

      // console.log(response)

      return response
    }

    return response

  },
  error => {
    NProgress.done()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
