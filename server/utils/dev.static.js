const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const serverConfig = require('../../build/webpack.config.server');
const MemoryFs = require('memory-fs'); // 等同于fs模块，只是memory-fs是在内存读写
const ReactSSR = require('react-dom/server');
const proxy = require('http-proxy-middleware');


const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:9000/public/index.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject);
    })
}

const Module = module.constructor;

const mfs = new MemoryFs;

const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
   
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(error => {
        console.log(err);
    });

    stats.warnings.forEach(warning => {
        console.log(warning);
    })

    const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename);
    const bundle = mfs.readFileSync(bundlePath, 'utf-8'); // 这里读出来的bundle是字符串格式，需要转换
    const m = new Module();
    m._compile(bundle, 'server-entry.js'); // 必须指定文件名称 Path must be a string. Received undefined
    serverBundle = m.exports.default;

})

module.exports = function (app) {

    app.use('/public', proxy({
        target: 'http://localhost:9000'  // 凡是请求静态资源的东西，均代理到devser开启的服务那里
    }))


    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const content = ReactSSR.renderToString(serverBundle);
            res.send(template.replace('<!-- <app/> -->', content));
        })
    })
}