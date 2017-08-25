const path = require('path');

const paths = {
  src: path.join(__dirname, '../src'),
  node_modules: path.join(__dirname, '../node_modules')
}

module.exports = (baseConfig, env) => {
  baseConfig.resolve.modules.push(
    paths.src, paths.node_modules
  )

  baseConfig.module.rules.push({
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
  })

  return baseConfig
}
