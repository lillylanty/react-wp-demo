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

 2.1
 ### 搭建前端服务器
 不要每次改动后都要重新npm run start编译再刷新index.html，所以，构建webpack-dev-server静态文件服务器
 ```npm install webpack-dev-server --save-dev　 ```
  在项目根目录下创建bin目录，进入bin目录，创建dev-server.js文件，编辑如下
  添加命令
  ``` "dev": "node bin/dev-server"```
  然后通过http://localhost:9090/就可以访问到index.html了，且不用每次都 run dev了，直接刷新就可以了。
  