const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },

  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      }, {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]

  }

}
