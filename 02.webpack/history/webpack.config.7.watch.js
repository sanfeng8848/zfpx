let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    home: './src/source-map/index.js'
  },
  // 多出口 '[name].js'  name就是变量
  output: { 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒问我 1000次
    aggregateTimeout: 2000, // 防抖 
    ignored: /node_modules/  // 不需要进行监控的文件目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      temlate: './src/source-map/index.html',
      filename: 'index.html'
    })
  ]
}