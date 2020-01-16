const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },

  output: {
    filename: '[name].[hash:8].js'
  },

  plugins: [
    new HTMLPlugin(
      {
        template: path.join(__dirname, path.join('../client/template.html'))
      }
    )
  ]

})
