const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // mode:'development',
    devtool:'cheap-module-eval-source-map',
    entry: {
       app:[
           'babel-polyfill',
           path.resolve(__dirname, '../src/index.js'), //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
        ],
        vendor: ['react', 'react-dom', 'babel-polyfill'] //把第三方库分离开来
    },
    resolve: { //指定第三方库目录， 减少webpack寻找时间
        modules: [ path.resolve(__dirname, '../node_modules') ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // 输出的路径
        filename: 'app/[name]_[hash:8].js'  // 打包后文件
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
    // plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity,
        // }),
        
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../src/index.template.html'),
        //     inject:true
        // })
    // ],
    optimization:{
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize:0,
            minChunks:2,
            maxAsyncRequests: 5,
            maxInitialRequests:3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    
}