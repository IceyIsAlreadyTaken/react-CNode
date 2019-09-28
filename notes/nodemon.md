### nodemon作用
node项目开发过程中，避免每次修改文件，需要停止服务再重启的麻烦，可以采用nodemon来监听文件修改自动重启服务   
### 安装
```
// 两种方式自由选择
yarn add nodemon -g // 全局安装
yarn add nodemon -D // 项目内安装 

```
### 使用

nodemon的配置文件，支持命令行内传参、packge.json中拓展、使用nodemon.json配置文件三种方式   
nodemon.json文件示例

```

{
    "restartable": "rs",  // 赋予nodemon重启服务的权利 如果不设置nodemon将无法重启node服务
    "verbose": true, // 重启过程中出现错误是否输出详细错误信息，true代表输出
    "ignore": [  // 忽略的文件
        "build/**",
        "client/**",
        "node_modules/**/node_modules",
        "notes/*",
        ".babelrc",
        ".editconfig",
        ".eslintrc",
        ".gitignore",
        ".git/**",
        ".package.json",
        "yarn.lock"
    ],
    "env": { // 启动服务传入的变量
        "NODE_ENV": "development"
    },
    "execMap": { // 自定义文件后缀，告诉nodemon .rb后缀文件就是.ruby后缀文件
        "rb": "ruby",
        "pde": "processing --sketch={{pwd}} --run"
    },
    "ext": "js" // 监测文件扩展名
}

```