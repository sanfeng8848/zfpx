let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    home: './src/multientry/index.js',
    other: './src/multientry/other.js',
  },
  // 多出口 '[name].js'  name就是变量
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      temlate: './src/multientry/index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      temlate: './src/multientry/index.html',
      filename: 'other.html',
      chunks: ['other']
    })
  ]
}