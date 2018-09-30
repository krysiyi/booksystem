//引入captcha模块
const svgCaptcha = require('svg-captcha');

const Captcha = {
	//创建验证码
	genCaptcha(req,res,next){
		var captcha = svgCaptcha.create({
			size:4,
			noise:1,
			color:true
		});
		req.session.captcha = captcha.text;
		res.json({res_code:1, res_error:"", res_body: {data: captcha.data}});
	},
	verifyCaptcha(req,res,next){
		const {captcha} = req.query;//获取输入的验证码
		console.log(captcha.toUpperCase() === req.session.captcha.toUpperCase());
		if(captcha.toUpperCase() === req.session.captcha.toUpperCase())
			res.json({res_code:1, res_error:"", res_body: {valid: true}});
		else
			res.json({res_code:1, res_error:"", res_body: {valid: false}});
	}
}

module.exports = Captcha;