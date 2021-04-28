const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); 

module.exports = {

    entry: {
      main: './src/scripts/main.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
  
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({template: "./public/index.html"})
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public/index.html',
      },
  };