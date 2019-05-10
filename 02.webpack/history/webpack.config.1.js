// webpack是node写出来的
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',   
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
    })
  ],
  module: { // 模块
    rules: [  // 规则 css-loader 解析@import语法的 把css当做模块引用进来(在index.js文件中引用)
      // style-loader 把css插入到head标签中
      // loader 特点：单一, 如果是个字符串表示只用一个loader
      // 多个loader同时使用, 使用[]
      // loader顺序 默认是从右向左执行
      // loader可以写成对象的形式
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          {
            loader: 'style-loader',
            options: {
              // 表示将打包后的css模块插入到html的顶部
              // 如果html有内联样式,希望内联样式的优先级高,就使用这种方式
              // 默认不写insertAt: 'top', 则打包css的优先级高于html的内联样式
              insertAt: 'top'     
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader',   // 解析@import 路径等
          'less-loader'   // less -> css
        ]
      }
    ]
  }
}