let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
let webpack = require('webpack')

module.exports = smart(base, {
  mode: 'development',
  devServer: {
    
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // DEV: "'dev'"   // 双引号里包裹着单引号, 实际的js文件中DEV环境变量就是'dev'这个字符串
      DEV: JSON.stringify('development'),
      FLAG: 'true',     // 会将true这个boolean值插入到js文件中
      EXPRESSION: '10+10'
    }),
  ]
})