let path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    test: './src/testreactbundle.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}