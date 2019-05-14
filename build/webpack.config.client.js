const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },

    output: {
        filename: '[name][hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public'
    },
    module: {
        rules: [
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
    plugins: [
        new HTMLPlugin(
            {
                template: path.join(__dirname, path.join('../client/template.html'))
            }
        )
    ]


}