var express = require('express');
var router = express.Router();
var IdService = require('../services/id_service.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册账号
router.post('/register',IdService.register);
//登录
router.post('/login',IdService.login);
//修改
router.post('/update',IdService.update);
//查找用户
router.post('/find',IdService.find);
//注销
router.get('/logout',IdService.logout);
module.exports = router;
