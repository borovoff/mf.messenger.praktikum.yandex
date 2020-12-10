const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: 'main.js',
        path: dist,
    },
    devServer: {
        contentBase: dist,
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin([
            { from: './src/assets', to: 'assets' },
            { from: './src/css', to: 'css' },
            { from: './src/index.html' }
        ])
    ]
}
