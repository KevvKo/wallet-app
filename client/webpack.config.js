const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {

    entry: {
      main: "./src/main.ts"
    },
    resolve: {
      extensions: ['.cson']
    },
    module: {
      loaders: [
        { test: /\.cson$/, loader: "cson" }
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
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
          test: /config\.json$/,
          loader: 'special-loader',
          type: 'javascript/auto',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        "http": require.resolve("stream-http")
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new NodePolyfillPlugin()
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