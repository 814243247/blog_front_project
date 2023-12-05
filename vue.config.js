module.exports = {
  publicPath: "./", // 构建好的文件输出到哪里
  chainWebpack: config => {
    config.when(
        process.env.NODE_ENV === 'production', config => {
          console.log('生产者模式')
          config.entry('app').clear().add('./src/main-prod.js')
          config.set('externals', {
            vue: 'Vue',
            vuex: "Vuex",
            marked: "marked",
            'vue-router': 'VueRouter',
            axios: 'axios',
            lodash: '_',
            echarts: 'echarts',
            nprogress: 'NProgress',
            prism: 'Prism',
          })
          config.plugin('html').tap(args => {
            args[0].isProd = true
            return args
          })
        })
    config.when(process.env.NODE_ENV === 'development', config => {
      console.log('开发者模式')
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}