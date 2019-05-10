// webpack是node写出来的
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer: {   // 开发服务器配置
    port: 3000,  // 端口号
    progress: true, // 进度条
    contentBase: './build',  // 启动静态资源的指定的目录 
    compress: true   // 压缩
  },
  // mode: 'development',      // mode:模式 2中 production 压缩格式 development 不压缩
  mode: 'production',
  entry: './src/index.js',   // 入口, 从哪个地方开始打包
  output: {
    filename: 'bundle.[hash:8].js',      // 打包之后的文件名
    path: path.resolve(__dirname, 'build')    // 路径必须是一个绝对路径, resolve就是将相对路径转换为绝对路径
  },
  plugins: [  // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',     // html的模板
      filename: 'index.html',           // 生成的文件名
      minify: {
        removeAttributeQuotes: true,    // 删除html中的双引号,个别删除不了,比如里面有单引号的
        collapseWhitespace: true        // 折叠html的空行
      },
      hash: true                        // 生成文件的hash戳
    })
  ]
}