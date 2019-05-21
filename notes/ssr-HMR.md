### 问题的产生 
生产过程中服务端渲染肯定是从已经打包好的dist目录下获取html模板和js文件，使用react-dom的renderToString方法将js渲染到html模板中，然后返回给浏览器。  
但是开发过程中，前端渲染是基于devserver来实现的，每次修改并不会去build dist文件夹，这样的话，开发时服务端渲染则取不到最新的html模板和js文件，而且如果每次都需要去dist中获取，则每次修改都需要build出dist文件夹，会使开发流程变得复杂，浪费开发时间。 

因此，开发时服务端渲染也需要像开发时的前端渲染一样，具备热更新的功能，不需要每次去读取dist文件夹

### 思路
前端热更新的实现是基于devserver + react-hot-loader，devserver开启一个服务，每次修改会自动刷新，react-hot-loader监听每次修改实现局部刷新，无需刷新页面。  
那么开发时的服务端渲染可以依赖于内存中已经存在的前端的dist文件夹，注意是内存中的dist文件夹，你在项目目录下是看不到它的   

首先是获取html模板文件，可以使用axios请求本地的html页面，也就是前端渲染devserver开启的服务中的html文件  


其次是要有服务端渲染的js文件，这个文件哪里来，我们可以在node中使用webpack，每次修改会触发webpack编译，通过webpakc的watch来监听每次修改，监听到之后，使用memory-fs模块读取文件js文件（不使用fs是因为fs是在硬盘中写入和读取比较耗费时间，而memory-fs是在内存中读取和写入，节省时间），读取到的是string类型不是可以执行的module，还需要一些方法将其转换为module给后端渲染使用


