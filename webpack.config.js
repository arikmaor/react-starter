const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.host)
const NODE_ENV = process.env.NODE_ENV || 'development'

const paths = {
  src: path.join(__dirname, 'src'),
  html: path.join(__dirname, 'src/index.html'),
  dist: path.join(__dirname, 'dist')
}

const common = {
  entry: path.join(paths.src, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: paths.dist
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: paths.node_modules,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.html
    })
  ]
}

const development = {
  entry: [
    'react-hot-loader/patch',
    paths.src,
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, development)
