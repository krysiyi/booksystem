const {Book}=require("./model.js");

const BookDao={
	//保存用户信息
	save(positionInfo){
		return new Position(positionInfo).save();
	}
	//按页查找职位
	/*findByPage(page){
		const pageSize=5;
		return Position.find().limit(pageSize).skip((page-1)*pageSize);
	},
	//查找总数目
	findPage(){
		return Position.find().count();
	},
	//修改职位信息
	update(condition,positionInfo){
		positionInfo.publish_time=new Date();
		//console.log(positionInfo);
		return Position.update(condition,positionInfo);
	},
	//删除职位信息
	remove(condition){
		return Position.remove(condition);
	},
	//查找职位信息
	find(condition){
		return Position.find(condition);
	}*/
}

module.exports=BookDao;