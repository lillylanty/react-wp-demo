const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var roles = process.node_env;
indexHtml = roles=='admin'? '../src/index.js':'../src/normal.js'
module.exports = {
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname,), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    ],
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: 'app/[name]_[hash:8].js'  // 打包后文件
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:[{
                    loader: 'style-loader',
                },
                {
                    loader:'css-loader?modules&locaIndentName=[name]-[hash:base64:5]'
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,/*  */
                use: [{
                    loader: 'file-loader',
                    options:{}
                }]
            },
            {
                test:/\.less$/,
                use:[{
                    loader:'style-loader',
                },{
                    loader:'css-loader?modules&locaIndentName=[name]-[hash:base64:5]',
                },{
                    loader:'less-loader',
                    options:{
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.template.html'),
            inject:true
        })
    ],
    
}