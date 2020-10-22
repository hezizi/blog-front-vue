const { join } = require('path')
const resolve = dir => join(__dirname, dir)
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.externals({
      axios: 'axios',
      moment: 'moment',
      highlight: 'highlight',
      marked: 'marked'
    })

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    // if (process.env.NODE_ENV === 'production') {
    //   config
    //   .plugin("compressionPlugin")
    //   .use(CompressionPlugin)
    //   .tap(() => [
    //     {
    //       test: /\.js$|\.html$|\.css/, //匹配文件名
    //       threshold: 1024, //超过1k进行压缩
    //       deleteOriginalAssets: false //是否删除源文件
    //     }
    //   ])
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        /**
         * 注意：在 sass-loader v8 中，这个选项名是 "prependData"
         */
        data: `@import "~@/assets/styles/variables.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
