const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { env } = require('process');

module.exports = {
  devtool: env.mode === 'development' ? 'cheap-eval-source-map' : '',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js%/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.css$/i,
        // use의 경우 오른쪽에서 왼쪽으로 읽습니다.
        // 즉, css-loader를 적용 후 style-loader 적용
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
