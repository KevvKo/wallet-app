const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {

    entry: {
      main: path.resolve(__dirname, "src", "main.ts")
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: "/dist",
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: [
          path.join(__dirname, 'public'),
          path.join(__dirname, 'src'),
        ],  
        compress: true,
        hot: false
      }
  };