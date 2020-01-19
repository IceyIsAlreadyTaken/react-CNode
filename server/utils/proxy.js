const axios = require('axios');

const baseUrl = 'http://cnodejs.org/api/v1';

module.exports = function (req, res) {
  const path = req.path;
  const user = req.session.user || {};
  const needAccessToken = req.query.needAccessToken;

  if (needAccessToken && user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    });
  }

  const query = Object.assign({}, req.query);
  if (query.needAccessToken) {
    delete query.needAccessToken;
  }
  // console.log('proxy=>', req.path);  // localhost:3333/api/topic->/topics

  axios(`${path}`, {
    method: req.method,
    baseURL: baseUrl,
    params: query,
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {

      res.send(resp.data);
    } else {
      res.status(resp.status).send(resp.data);
    }
  }).catch(err => {
    console.log('err =>', err.response);
    if (err.response) {
      res.status(500).send(err.response.data);
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      });
    }
  });
};