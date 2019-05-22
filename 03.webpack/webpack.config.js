let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,     // 服务启动自动代开
    contentBase: './dist' // 访问的是打包后的结果目录 
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      } 
    ]
  },
  plugins: [
    // 忽略第三方包内部引入的本地文件, 本地就是忽略moment包中moment.js中引入的所有语言包文件
    // 在moment/locale/...
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}