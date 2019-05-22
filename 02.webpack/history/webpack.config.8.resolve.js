let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  mode: 'production',
  // 多入口
  entry: {
    index: './src/common/index.js'
  },
  // 多出口 '[name].js'  name就是变量
  output: { 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    // 优先解析node_modules目录下的模块,不再向上查找
    modules: [path.resolve('node_modules')],
    extensions: ['.js','.css','.json','.vue'],
    // mainFields: ['style', 'main'],
    alias: {
      // 如果只想加载bootstrap的样式文件,import全路径会很麻烦,配置别名
      bootstrap: 'bootstrap/dist/css/bootstrap.css'   
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/common/index.html',
      filename: 'index.html'
    }),
    new cleanWebpackPlugin(),
    // new copyWebpackPlugin([
    //   // 把doc目录下的所有文件copy到输出目录下(dist),如果需要加特定目录,直接 { to: './doc' }
    //   { from: './doc', to: './' },
    //   // ...可以写多个 
    //   // { from: './data', to: './data'}
    // ]),
    new webpack.BannerPlugin('make by CNIAB 2019')
  ]
}