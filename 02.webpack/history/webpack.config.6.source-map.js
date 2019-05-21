let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    home: './src/source-map/index.js'
  },
  // 1. 源码映射 会单独生成一个sourcemap文件, 出错了会标识 当前报错的列和行 大而全
  // devtool: 'source-map', // 增加映射文件 可以帮助调试源代码 生成home.js
  // 2. 不会产生单独的文件, 继承到源代码文件中 可以显示行和列
  devtool: 'eval-source-map',   // 'cheap-module-source-map', 'cheap-module-eval-source-map'

  // 多出口 '[name].js'  name就是变量
  output: { 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      temlate: './src/source-map/index.html',
      filename: 'index.html'
    })
  ]
}