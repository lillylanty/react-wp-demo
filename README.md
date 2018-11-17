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

 