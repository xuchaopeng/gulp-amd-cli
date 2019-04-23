# gulp-cli-ie8
  ![jquery](https://img.shields.io/badge/jquery-1.8.3-blue.svg?style=flat-square)
  ![require](https://img.shields.io/badge/require-2.3.3-red.svg)
  ![juicer](https://img.shields.io/badge/juicer-0.6.14-orange.svg)
 
## 使用方法

``` shell
  # 打包命令
  npm run build
  
  # 本地服务启动
  npm run dev
```

## 目录结构
``` 

└─static 
    ├─css // 样式目录，使用sass
    │  ├─common 
    │  └─page
    ├─font 
    ├─iframe // 子窗口目录
    ├─image 
    └─js
        ├─common  // 公共js
        ├─page // 页面js
        └─plugin // 插件库
```