// webpack是node写出来的
let path = require('path')
// 所有的插件都是类class
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// let MiniLessExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let TerserJSPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let Webpack = require('webpack')
module.exports = {
  // 优化项
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  externals: {
    jquery: "$"
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
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://www.baidu.com'
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
      filename: 'css/main.css'
    }),
    // new Webpack.ProvidePlugin({
    //   '$': 'jquery' // 在每个模块中都注入$
    // })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: 'file-loader'
      // },
      {
        test: /\.(png|gif|jpg)$/,
        // 做一个限制, 当图片小于多少k的时候，用base64来转化, 大于多少k用file-loader把图片产出
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            outputPath: '/img/'
          }
        }
      },
      // {
      //   test: require.resolve('jquery'),
      //   // 在js文件中引入jquery,默认暴露$变量到全局,js文件中直接写import $ from 'jquery'
      //   use: 'expose-loader?$'    
      // },
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