const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
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
    ],

    devServer: { // 这里一定要注意删除根目录下的打包好的dist文件夹，不然devserver会读取dist文件夹的内容，但是js文件没有在public下，会导致js文件404
        host: '0.0.0.0', // 可以使用ip访问，可以使用localhost访问
        publicPath: '/public',
        contentBase: path.join(__dirname, '../dist'),
        port: 9000,
        compress: true, //压缩
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/public/index.html' },
            ]
        },
        overlay: {
            errors: true
        }
    }


}