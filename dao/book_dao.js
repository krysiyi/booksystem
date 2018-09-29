const {Book}=require("./model.js");

const BookDao={
	//保存用户信息
	save(bookInfo){
		return new Book(bookInfo).save();
	},
	//按页查找图书
	findByPage(page){
		const pageSize=3;
		return Book.find().limit(pageSize).skip((page-1)*pageSize);
	},
	//查找总数目
	findPage(){
		return Book.find().count();
	},
	//删除图书信息
	remove(condition){
		return Book.remove(condition);
	},
	//修改图书信息
	update(condition,bookInfo){
		return Book.update(condition,bookInfo);
	},
	//查找图书信息
	find(condition){
		return Book.find(condition);
		//return condition;
	}
}

module.exports=BookDao;