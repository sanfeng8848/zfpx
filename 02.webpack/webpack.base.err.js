let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')  // webpack自带插件功能 比如banner 定义环境变量等
module.exports = {
  entry: {
    index: './src/common/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'),
      FLAG: 'true',
      EXPRESSION: '1+2'
    }),
    new cleanWebpackPlugin(),
    new webpack.BannerPlugin('This is for CNIAB@2019')
  ]
}