const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs'); // 等同于fs模块，只是memory-fs是在内存读写
const ReactSSR = require('react-dom/server');
const proxy = require('http-proxy-middleware');
const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () => new Promise((resolve, reject) => {
  axios.get('http://localhost:9000/public/index.html')
    .then((res) => {
      resolve(res.data);
    })
    .catch(reject);
});

const Module = module.constructor;

const mfs = new MemoryFs();

const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle, createStoreMap;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach((error) => {
    console.log(error);
  });

  stats.warnings.forEach((warning) => {
    console.log(warning);
  });

  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename);
  const bundle = mfs.readFileSync(bundlePath, 'utf-8'); // 这里读出来的bundle是字符串格式，需要转换
  const m = new Module();
  m._compile(bundle, 'server-entry.js'); // 必须指定文件名称 Path must be a string. Received undefined
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
});

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:9000', // 凡是请求静态资源的东西，均代理到devser开启的服务那里
  }));

  app.get('*', (req, res) => {
    getTemplate().then((template) => {

      const routerContext = {};

      const app = serverBundle(createStoreMap, routerContext, req.url);
      const content = ReactSSR.renderToString(app);
      if (routerContext.url) { // 服务端处理重定向
        res.status(302).setHeader('Location', routerContext.url);
      }

      res.send(template.replace('<!-- <app/> -->', content));
    }).catch(err => {
      console.log(err);
    });
  });
};
