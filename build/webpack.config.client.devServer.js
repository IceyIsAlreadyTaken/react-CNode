const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  },
  output: {
    filename: '[name][hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        options: {
          emitError: true,
          emitWarning: true,
          failOnError: true,
          failOnWarning: true
        }
      },
      {
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

  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HTMLPlugin(
      {
        template: path.join(__dirname, path.join('../client/template.html'))
      }
    ),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: { // 这里一定要注意删除根目录下的打包好的dist文件夹，不然devserver会读取dist文件夹的内容，但是js文件没有在public下，会导致js文件404
    host: '0.0.0.0', // 可以使用ip访问，可以使用localhost访问
    publicPath: '/public',
    contentBase: path.join(__dirname, '../dist'),
    port: 9000,
    hot: true,
    compress: true, // 压缩
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/public/index.html' },
        { from: /^\/detail$/, to: '/public/index.html' },
        { from: /^\/testapi$/, to: '/public/index.html' }
      ]
    },
    // historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        secure: false
      }
    },
    overlay: {
      errors: true
    }
  }

}
