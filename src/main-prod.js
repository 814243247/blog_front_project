import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Element from 'element-ui'
import mavonEditor from 'mavon-editor'
import marked from 'marked'
import axios from 'axios'
import {VueJsonp} from 'vue-jsonp'
import NProgress from 'nprogress'
import './assets/fonts/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'
// import './plugins/element.js'
// import '@/assets/css/animate.css'
import '@/assets/css/typo.css'
import 'mavon-editor/dist/css/index.css'
import '@/assets/css/global.css'
// import 'nprogress/nprogress.css'
import waterfall from 'vue-waterfall2'
import vcolorpicker from 'vcolorpicker'
// import * as echarts from 'echarts'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5;
Vue.prototype.$marked = marked
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$jsonp = VueJsonp


const blog = axios.create({ // 博客后台api地址
  baseURL: 'http://www.suenaga.top:8080'
})

const picture = axios.create({ // 图片服务器api地址
  baseURL: 'http://www.suenaga.top:8080'
})

blog.interceptors.request.use(config => {
  NProgress.start()
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

blog.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$blog = blog
Vue.prototype.$picture = picture

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueJsonp)
Vue.use(vcolorpicker)
Vue.use(waterfall)

Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
})

Vue.filter('dataFormat2', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${y}-${m}`
})

Vue.filter('dataFormat3', function (originVal) {
  const dt = new Date(originVal)
  let usedTime = new Date() - dt
  let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
  let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
  let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
  let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
  let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
  if (days > 0) return days + '天前'
  if (hours > 0) return hours + '小时前'
  return minutes + '分前'
})


Vue.filter('dataFormat4', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const h = (dt.getHours() + '').padStart(2, '0')
  const M = (dt.getMinutes() + '').padStart(2, '0')
  const s = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${M}:${s}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
