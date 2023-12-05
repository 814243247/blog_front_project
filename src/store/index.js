import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.sessionStorage.getItem('user')),
    token: JSON.parse(window.sessionStorage.getItem('token')),
    administrator:JSON.parse(window.sessionStorage.getItem('user'))!==null&&JSON.parse(window.sessionStorage.getItem('user')).type==='1',
    loginFormVisiable:false,
    registorFormVisiable:false,
    pageName:'index',
  },
  mutations: {
    // 改变页面
    changePage(state,name){
      state.pageName = name
    },
    // 获取用户信息
    getUserInfo(state){
      state.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
      state.token = JSON.parse(window.sessionStorage.getItem('token'))
      if (state.userInfo !== null && state.userInfo.type == '1') {
        state.administrator = true
      } else {
        state.administrator = false
      }
    },
    showLFV(state){
      state.loginFormVisiable = true
    },
    showRFV(state){
      state.registorFormVisiable = true
    },
    cancelLFV(state){
      state.loginFormVisiable = false
    },
    cancelRFV(state){
      state.registorFormVisiable = false
    },
    logout(state){
      state.userInfo = null
      state.administrator = false
    }
  },
  actions: {
  },
  modules: {
  }
})
