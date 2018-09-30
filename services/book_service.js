const BookDao = require("../dao/book_dao.js");

const BookService = {
	// 发布图书信息
	publish(req, res, next) {
		// 获取请求中传递的职位数据
		const {_id,name,type,number,price,publish} = req.body;
		let cover = "/images/upload/" + req.file.filename; // 获取上传文件Cover路径
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
	//按页查找图书
	findByPage(req,res,next){
		const {page}=req.body;
		BookDao.findByPage(page)
					.then((data)=>{
						res.json({res_code:1,res_error:"",res_body:{data}});
					})
					.catch((err)=>{
						res.json({res_code:1,res_error:err,res_body:{}});
					});
	},
	//查找页数
	findPage(req,res,next){
		BookDao.findPage()
					.then((data)=>{
						data=Math.ceil(data/3);
						res.json({res_code:1,res_error:"",res_body:{data}});
					})
					.catch((err)=>{
						res.json({res_code:1,res_error:err,res_body:{}});
					});
	},
	//删除图书
	remove(req,res,next){
		const {_id}=req.body;
		BookDao.remove({_id})
				.then((data)=>{
					res.json({res_code:1,res_error:"",res_body:{data}});
				})
				.catch((err)=>{
					res.json({res_code:0,res_error:err,res_body:{}});
				});
	},
	//修改图书信息
	update(req,res,next){
		const {_id,name,type,number,price,publish} = req.body;
		var obj={_id,name,type,number,price,publish};
		for(var key in obj){
			if(!obj[key]) delete obj[key];
		}
		if(req.file){
			let cover="/images/upload/"+req.file.filename;
			obj.cover=cover;
		}
		//console.log(obj);
		BookDao.update({_id},obj)
				.then((data)=>{
					res.json({res_code:1,res_error:"",res_body:{data}});
				})
				.catch((err)=>{
					res.json({res_code:0,res_error:err,res_body:{}});
				});
	},
	// 按条件查找图书
	find(req, res, next) {
		//console.log(req.body.info);
		var {_id}=req.body;
		if(_id){
			var obj={_id};
		}else{
			// 获取查询的页码
			const {type,info} = req.body;
			// 查询条件 模糊查询
			var obj={}
			//console.log(info);
			obj[type]=new RegExp(info,"i");
			//console.log(query);
			
		}
		//console.log(obj);
		BookDao.find(obj)
					.then((data)=>{
						console.log(data);
						res.json({res_code:1, res_error:"", res_body:{data}});
					})
					.catch((err)=>{
						res.json({res_code:1, res_error:err, res_body:{}});
					});
		}
	}

module.exports = BookService;