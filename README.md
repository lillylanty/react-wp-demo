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

