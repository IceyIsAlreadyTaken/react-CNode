const path = require('path');

module.exports = {
    mode:'production',
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