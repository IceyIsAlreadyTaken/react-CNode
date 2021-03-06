
const express = require('express');

const ReactSSR = require('react-dom');
const bodyParser = require('body-parser');
const session = require('express-session');


const fs = require('fs');

const favicon = require('serve-favicon'); // node处理icon图标的中间件

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}));

app.use('/api/user', require('./utils/handle-login'));
app.use('/api', require('./utils/proxy'));

app.use(favicon(path.join(__dirname, '../favicon.ico')));

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js').default;
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
  app.use('/public', express.static(path.join(__dirname, '../dist')));
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace('<!-- <app/> -->', appString));
  });
} else {
  const devStatic = require('./utils/dev.static.js');
  devStatic(app);
}

app.listen(3333, function () {
  console.log('node is listening 3333');
});
