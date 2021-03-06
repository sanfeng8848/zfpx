let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  mode: 'production',
  devServer: {
    hot: true,
    port: 3000,
    open: true,     // 服务启动自动代开
    contentBase: './dist' // 访问的是打包后的结果目录 
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
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
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      } 
    ]
  },
  plugins: [
    // 忽略第三方包内部引入的本地文件, 本地就是忽略moment包中moment.js中引入的所有语言包文件
    // 在moment/locale/...
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new cleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),   // 热更新插件
    new webpack.NamedModulesPlugin()    // 打印更新的模块路径
  ]
}