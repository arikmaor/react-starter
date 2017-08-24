const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

const paths = {
  src: path.join(__dirname, 'src'),
  html: path.join(__dirname, 'src/index.html'),
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules')
}

const common = {
  entry: path.join(paths.src, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: paths.dist
  },
  resolve: {
    modules: [paths.src, paths.node_modules],
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
        exclude: paths.node_modules
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
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
        include: paths.src,
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(common, development)
