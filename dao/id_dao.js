const {User,Manager} = require("./model.js");

const IdDao = {
	save(info,level){
		info.reg_time = new Date();
		if(level==0){//判断是否为普通用户注册
			info.book = null;
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
		if(level==0){//判断是否为普通用户更新
			return User.update(condition,info);
		}else{//管理员账号注册
			return Manager.update(condition,info);//存入集合操作
		}
	},
	find(condition,level){
		if(level==0){//判断是否为普通用户注册
			return User.find(condition);
		}else{//管理员账号注册
			return Manager.find(condition);//存入集合操作
		}
	},
	logout(){

	}
};

module.exports = IdDao;