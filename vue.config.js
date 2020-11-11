const { join } = require('path')
const resolve = dir => join(__dirname, dir)
const CompressionPlugin = require("compression-webpack-plugin")
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

// cdn
const cdn = {
  css: ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/styles/atom-one-dark.min.css'],
  js: [
    '//cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.3/vue-router.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/marked/0.7.0/marked.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/highlight.min.js'
  ]
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      /**
       * Svg icons make bunlde size too large
       * https://github.com/ant-design/ant-design/issues/12011
       */
      .set('@ant-design/icons/lib/dist$', resolve('src/icons/index.js'))

    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      highlight: 'hljs',
      marked: 'marked'
    })
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })

    /**
     * webpack loader that lets you use SVG files as Vue components
     * https://www.npmjs.com/package/vue-svg-loader
     */
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    if (isProd) {
      /**
       * Replace Moment.js with Day.js in Antd project
       * https://www.npmjs.com/package/antd-dayjs-webpack-plugin
       */
      config
        .plugin('antdDayjsWebpackPlugin')
        .use(AntdDayjsWebpackPlugin)

      // config
      //   .plugin("compressionPlugin")
      //   .use(CompressionPlugin)
      //   .tap(() => [
      //     {
      //       test: /\.js$|\.html$|\.css/, //匹配文件名
      //       threshold: 1024, //超过1k进行压缩
      //       deleteOriginalAssets: false //是否删除源文件
      //     }
      //   ])
    }
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
