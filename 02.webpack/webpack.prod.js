let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin');
let webpack = require('webpack')

// 生产环境的配置
module.exports = smart(base, {
  mode: 'production',
  // 优化项
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // DEV: "'dev'"   // 双引号里包裹着单引号, 实际的js文件中DEV环境变量就是'dev'这个字符串
      DEV: JSON.stringify('production'),
      FLAG: 'true',     // 会将true这个boolean值插入到js文件中
      EXPRESSION: '1+1'
    }),
  ]
})