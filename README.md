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
然后在浏览器中点击按钮，页面中数值随之增加。然后，我们修改一下App.js（在button标签下增加其他标签），保存后浏览器自动刷新。我们查看一下浏览器，那么问题来了，刚刚点击增加后的数值不见了，又回到了初始值1。这时候发现组件的状态并没有保存下来，没有达到真正意义上的React热更新。所以这里还需要引入一个插件，来帮我们解决热更新组件状态保存问题。这也是react-hot-loader的由来。
``` 
npm install react-hot-loader --save-dev
npm install babel-polyfill --save
```
 更改webpack.config.js。
 ``` entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        ...
  ```
  更改index.js。
  ```  
  import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
render(
        <AppContainer>
            <Component />
        </AppContainer>,
  ```
   更改.babelrc。
   ``` {
  "presets": [
    [
      "es2015",
      {
        "module": false
      }
    ],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"]
}
```
### 2.5 添加对es7语法的支持
npm install babel-preset-stage-1 --save　　
 最后修改.babelrc即可。

......
"react",
"stage-1"
......
### 2.6  其他常用加载器

　　　　css-loader: 解析css代码

　　　　style-laoder: 将编译后css样式导入到html中

　　　　less-loader: 加载和转移less文件

　　　　raw-loader: 加载文件原始内容（utf-8格式）

　　　　url-loader: 多用于加载图片

　　　　file-loader: 打包文件

### 3.0 分离不同环境公有配置
安装webpack-merge(用于合并配置)、uglifyjs-webpack-plugin(js代码压缩，这里单独提取出来控制版本)和rimraf(跨平台删除工具)。

