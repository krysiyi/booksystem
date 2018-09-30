const {User,Manager} = require("./model.js");

const IdDao = {
	save(info,level){
		info.reg_time = new Date();
		if(level==0){//判断是否为普通用户注册
			info.book = [];
			return new User(info).save();
		}else{//管理员账号注册
			return new Manager(info).save();//存入集合操作
		}	
	},
	login(condition,level){
		if(level==0){//判断是否为普通用户登录
			return User.find(condition);
		}else{//管理员账号注册
			return Manager.find(condition);//存入集合操作
		}
	},
	update(condition,info,level){
		if(info.book){
			info.book = JSON.parse(info.book);
			if(info.book.length===0)
			return User.update(condition,{book:[]});
			const index = info.book.length-1;
			if(!info.book[index].borrow_time)
			info.book[index].borrow_time = new Date();
		}
		if(level==0){//判断是否为普通用户更新
			return User.update(condition,info);
		}else{//管理员账号注册
			return Manager.update(condition,info);//存入集合操作
		}
	},
	find(condition,level){
		if(level==0){//判断是否为普通用户注册
			if(condition.name ==="kry"){
				return User.find();
			}else{
				return User.find(condition);
			}
		}else{//管理员账号注册
			return Manager.find(condition);//存入集合操作
		}
	},
	logout(){

	},
	findpage(page){
		const pageCount = 3;
		return User.find().skip((page-1)*pageCount).limit(pageCount);
	}
};

module.exports = IdDao;