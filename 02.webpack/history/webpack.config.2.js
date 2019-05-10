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
    filename: 'bundle.[hash:8].js',
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
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
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