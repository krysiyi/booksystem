var express = require('express');
var router = express.Router();
var BookService=require("../services/book_service.js");
var path=require("path");
var multer=require("multer");

//配置磁盘存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/images/upload"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")));
  }
})
 
var upload = multer({ storage: storage })

//发布职位
router.post("/publish",upload.single("cover"),BookService.publish);
//按页查找职位
/*router.post("/findbypage",PositionService.findByPage);
//查找总页数
router.post("/findpage",PositionService.findPage);
//修改职位
router.post("/update",upload.single("logo"),PositionService.update);
//删除职位
router.post("/remove",PositionService.remove);
//按条件查找职位
router.post("/find",PositionService.find);*/


module.exports = router;
