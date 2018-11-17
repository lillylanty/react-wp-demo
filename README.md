 在项目根目录下新建json文件.babelrc，将babel的配置单独提取出来。
```
{
  "presets": [
    "es2015",
    "react"
  ]
}
 ```
 webpack.config.js文件作相应的调整。
 module:{ rules:{ loader: 'babel-loader} }

 ### 2.1 搭建前端服务器
 
 不要每次改动后都要重新npm run start编译再刷新index.html，所以，构建webpack-dev-server静态文件服务器
 ```npm install webpack-dev-server --save-dev　 ```
  在项目根目录下创建bin目录，进入bin目录，创建dev-server.js文件，编辑如下
  添加命令
  ``` "dev": "node bin/dev-server"```
  然后通过http://localhost:9090/就可以访问到index.html了，且不用每次都 run dev了，直接刷新就可以了。

  ### 2.2 自动生成index.html
  删除根目录下dist目录，刚刚我们是自己编写和配置index.html，将打包后的js引入到index.html中。现删除后启动服务会报错，现在我们使用插件实现自动引入，免去手工配置，安装html-webpack-plugin。
```npm install html-webpack-plugin --save-dev ```
　　在src目录新建index.template.html。
编辑webpack.config.js。最后重新启动服务即可。若是想看打包后的文件可以打开chorme，在Sources即可看见。或者使用webpack --config webpack/webpack.config.js进行构建，在项目目录的dist目录查看
### 2.3 devtool
在开发的过程，我们会经常调试，so，为了方便我们在chrome中调试源代码，需要更改webpack.config.js，然后启动webpack-dev-server。完成之后在chrome浏览器中打开debug，点击Sources选项，即可看见提示，继而输入你想查看的源文件名即可显示该文件源代码，如果你觉得某处代码有问题，对应行号打上断点即可调试。
``` module.exports = {
    devtool: 'cheap-module-eval-source-map',
    ......
 } 
```
### 2.4 HMR
它在代码修改后重新打包并发送到浏览器，浏览器将获取的新模块替换老模块，在不刷新浏览器的情况下实现对应用的更新。由于我们使用的是webpack-dev-server，它提供了两种自动刷新方式供我们选择，iframe和inline模式。这里我们选择inline模式，更改dev-server.js。 
``` const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, '../build'), // 默认会以根文件夹提供本地服务器，这里指定文件夹
    inline: true, // 自动刷新
    hot: true, 
```
更改webpack.config.js
``` const webpack = require('webpack');
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
　　　　　'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.js')
    ],
　　 ......
    plugins: [
        new webpack.HotModuleReplacementPlugin()
　　　　 ......
    ]
```
最后更改index.js
``` 
renderDom(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const App = require('./App').default;
        renderDom(App);
    })
} 
```

