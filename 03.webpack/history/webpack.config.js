let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')

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
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
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
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json') 
    }),
    new Happypack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }),
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    })
  ]
}