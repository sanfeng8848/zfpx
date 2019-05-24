let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  // mode: 'development',
  optimization: {
    splitChunks: {    // 分隔代码块
      // miniSize: 0,
      // minChunks: 2,
      // cacheGroups: {    // 缓存组
      //   default: {     // 公共的模块
      //     chunks: 'initial',
          
      //   },
      //   vendors: {
      //     priority: 1,
      //     test: /node_modules/,   // 匹配的都抽离出来
      //     chunks: 'initial',
      //     miniSize: 0,
      //     minChunks: 2
      //   }
      // }
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  mode: 'production',
  devServer: {
    port: 3000,
    open: true,     // 服务启动自动代开
    contentBase: './dist' // 访问的是打包后的结果目录 
  },
  entry: {
    index: './src/index.js',
    other: './src/other.js'
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
    new cleanWebpackPlugin()
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json') 
    // })
  ]
}