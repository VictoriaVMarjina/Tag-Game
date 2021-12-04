const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "index.js"
    },
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, "../Tag-Game-BackEnd/public"),
        hot: true,
        open: true,
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/
        },
        writeToDisk: filePath => {
            return /(index.html$)|(index.js$)|(style.css$)/.test(filePath)
        }
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {test: /\.html$/, use: "html-loader"},
            {test: /\.less$/, use: [CssWebpackPlugin.loader, "css-loader", "less-loader"]},
            {test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: './images',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html"
        }),
        new CssWebpackPlugin({
            filename: "style.css"
        })
    ]
}
