// webpack是node写出来的
let path = require('path')
// 所有的插件都是类class
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// let MiniLessExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // 优化项
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     }), 
  //     new OptimizeCSSAssetsPlugin({})
  //   ],
  // },
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      // 抽离出的样式的名字
      filename: 'main.css'
    })
  ],
  module: {
    rules: [ 
      // loader默认是从右向左, 从下到上, 也就是rules这个数组中, 从最后一个下标的对象匹配开始执行
      // 原则上,应该先进行代码检查eslint,然后再进行babel编译, 但是增加options的enforce,进行强制优先进行
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre'      // pre: previouse, post: 最后处理
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { //用babel-loadr 需要把 es6--> es5
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              // 修饰装饰器 和 类 class ES7
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime" // 添加对generator支持的包
            ]
          }
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
          // 使用这个插件的loader,将css抽离出去,而不再使用style-loader将css作为style标签
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 使用postcss-loader这个loader加载,postcss.config.js,里面使用的plugins是autoprefixer
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'css-loader',
          // 使用postcss-loader这个loader加载,postcss.config.js,里面使用的plugins是autoprefixer
          'postcss-loader'
        ]
      }
    ]
  }
}