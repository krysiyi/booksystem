var express = require('express');
var router = express.Router();
var Captcha = require('../services/captcha.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/captcha',Captcha.genCaptcha);
router.get('/api/verifycaptcha',Captcha.verifyCaptcha);

module.exports = router;
