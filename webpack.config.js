const webpack = require('webpack');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const development = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve('src'),

    entry: './index.js',

    output: {
        filename: 'js/bundle.min.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: process.env.NODE_ENV === 'gh-pages' ? '/jsbuilder-v1/' : '/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [path.resolve('src')],
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: development }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: development }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: development }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g|eot|svg|ttf|otf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.json', '.js', '.scss', '.html'],
        alias: {
            vendors: path.resolve('src/vendors')
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.min.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/index.html'), to: 'index.html' },
                { from: path.resolve(__dirname, 'src/demo'), to: 'demo' }
            ]
        }),
        ...(development ? [new webpack.HotModuleReplacementPlugin()] : [])
    ],

    optimization: {
        minimize: !development,
        minimizer: [
            new TerserPlugin({
                exclude: /demo/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
            new CssMinimizerPlugin({
                exclude: /demo/
            })
        ]
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        compress: true,
        hot: true,
        historyApiFallback: true,
    },

    devtool: development ? 'source-map' : false
};
