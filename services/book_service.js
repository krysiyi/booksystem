const PositionDao = require("../dao/book_dao.js");

const BookService = {
	// 发布职位信息
	publish(req, res, next) {
		// 获取请求中传递的职位数据
		const {_id,name,type,number,price,publish} = req.body;
		let cover = "/imgs/upload/" + req.file.filename; // 获取上传文件Cover路径
		// const {name, company, address, salary} = req.query;
		// 保存到数据库中
		BookDao.save({_id,name,type,number,price,publish,cover})
							.then((data)=>{
								console.log(data);
								res.json({res_code: 1, res_error: "", res_body: {data}});
							})
							.catch((err)=>{
								res.json({res_code: 0, res_error: err, res_body: {}});
							});
	},
	// 查询职位信息
	/*find(req, res, next) {
		// 获取查询的页码
		const {page} = req.query;
		// 查询
		PositionDao.findByPage(page)
							.then((data)=>{
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	}*/
}

module.exports = BookService;