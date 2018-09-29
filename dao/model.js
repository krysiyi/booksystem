const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/booksystem");

const userSchema = new mongoose.Schema({
	name:String,
	password:String,
	tel:Number,
	sex:String,
	age:Number,
	book:Array,
	reg_time:Date
});

const managerSchema = new mongoose.Schema({
	name:String,
	password:String,
	tel:Number,
	sex:String,
	age:Number,
	reg_time:Date
});

const bookSchema = new mongoose.Schema({
	_id:String,
	name:String,
	type:String,
	number:Number,
	price:Number,
	publish:String,
	cover:String
});


const User = mongoose.model('user',userSchema);
const Manager = mongoose.model('manager',managerSchema);
const Book = mongoose.model('book',bookSchema);

//导出模型

module.exports = {User,Manager,Book};