const router = require('express').Router();
const axios = require('axios');

const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login', function (req, res, next) {
  axios.post('/accesstoken',
    {
      accesstoken: req.body.accessToken
    },
    {
      baseURL: baseUrl
    }).then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginName,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        };
        res.json({
          success: true,
          data: resp.data
        });
      }
    }).catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        });
      } else {
        next(err); // 把错误抛给全局处理器
      }
    });
});

module.exports = router;