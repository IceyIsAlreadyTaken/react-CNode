#### 如何在react项目中添加热更新功能
1. 安装```relact-hot-loader```插件，配置.babelrc添加plugin
```
  //.babelrc
   {
       "plugins":[" "react-hot-loader/babel""]
   }
```

2. 确保入口文件添加react-hot-loader，方式有很多种，可以参加npm，此处选择在webpack配置文件中配置
```
   // webpack.config.devserver.js
   entry:{
       app:[
       'react-hot-loader/patch',
       path.join(__dirname, '../client/app.js')
       ]
   }
```
3. webpakc中添加HotModuleReplacementPlugin插件
```
 // webpack.config.devserver.js
 const webpack = require('webpack');
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
```
4.将根组件标记为热更新
```
// App.js
import { hot } from 'react-hot-loader/root'
const App = () => <div>Hello World!</div>
export default hot(App)
```
done