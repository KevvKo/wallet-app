const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/scripts/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './index.html',
      },
  };