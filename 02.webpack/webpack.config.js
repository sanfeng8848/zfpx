let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

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
  plugins: [
    new HtmlWebpackPlugin({
      temlate: './src/source-map/index.html',
      filename: 'index.html'
    }),
    new cleanWebpackPlugin(),
    new copyWebpackPlugin([
      // 把doc目录下的所有文件copy到输出目录下(dist),如果需要加特定目录,直接 { to: './doc' }
      { from: './doc', to: './' },
      // ...可以写多个 
      // { from: './data', to: './data'}
    ]),
    new webpack.BannerPlugin('make by CNIAB 2019')
  ]
}