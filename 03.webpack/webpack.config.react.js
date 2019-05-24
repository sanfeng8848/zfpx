let path = require('path')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',// 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',   // 产生的变量名
    libraryTarget: 'var'     // commonjs, var, umd, this --> this["returnValue"]
  },
  plugins: [
    // 生成一个清单,用于找到生成的文件_dll_[name].js的模块清单
    new webpack.DllPlugin({ 
      name: '_dll_[name]',         // name == library
      path: path.resolve(__dirname, 'dist', 'manifest.json')  // 模块清单生成的位置
    }),
    new cleanWebpackPlugin()
  ]
}