function User(){
	this.loadInfo();
	this.addListener();
	this.init();
};
$.extend(User.prototype,{
	init(){
		//图书信息
		this.loadByPage(1);
		this.loadPage();
	},
	loadInfo(){
			let loginUser = JSON.parse(sessionStorage.loginUser);
			let html=`<tr class="userinfo">
							<td>${loginUser.name}</td>
							<td>${loginUser.sex}</td>
							<td>${loginUser.age}</td>
							<td>${loginUser.tel}</td>
							<td>${loginUser.reg_time}</td>
							<td>
								<a href="javascript:void(0);" title="" class="updatePro" data-toggle="modal" data-target="#updateModal">修改</a>
							</td>
						</tr>`;
			$(".box").eq(1).find("tbody").html(html);
	},
	update(){
		const url="/api/update/";
		data = $(".update-form").serialize() + "&level=0";
		name = $(".update-form input")[0].value;
		$.post(url,data,(data)=>{
			
			if(data.res_code===1){
				this.find({name});
			}else{
				$(".update-error").removeClass("hidden");
				// 修改失败
				setTimeout(()=>{
					$(".update-error").addClass("hidden");
				},1500);
			}
			
		})
	},
	find(condition){
		const url="/api/find";
		condition.level=0;
		$.post(url,condition,(data)=>{
			if (data.res_code === 1) { // 修改成功
				// 将修改成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data[0]);
				// 关闭模态框
				$("#updateModal").modal('hide');
				//刷新页面
				this.loadInfo();
				// 修改成功
				$(".update-success").removeClass("hidden");
				setTimeout(()=>{
					$(".update-success").addClass("hidden");
				},1500);
			}
		});
	},
	addListener(){
		$(".tab").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			const index = $(this).index();
			//console.log(index);
			$(".box").eq(index).removeClass("hidden").siblings(".panel").addClass("hidden");

		});
		$(".updatePro").on("click",function(){
			let loginUser = JSON.parse(sessionStorage.loginUser);
			//console.log(loginUser);
			$(".update-form").find("input")[0].value = loginUser.name;
			$(".update-form").find("input")[1].value = loginUser.sex;
			$(".update-form").find("input")[2].value = loginUser.age;
			$(".update-form").find("input")[3].value = loginUser.tel;
		});
		//更新按钮
		$(".update-btn").on("click",this.update.bind(this));
		//点击翻页处理
		$(".pagination").on("click",".page",this.loadByPageHandler.bind(this));
		//页面后退
		$(".pagination").on("click",".previous",this.loadByPrevious.bind(this));
		//页面前进
		$(".pagination").on("click",".next",this.loadByNext.bind(this));
		//搜索类型
		$(".chooseType").on("click","a",this.chooseType);
		//搜索
		$(".find").on("click",this.findBook);
		//重新加载全部图书信息
		$(".reload").on("click",this.init.bind(this));
		//借阅图书相关事件
		$(".book-table tbody").on("click",".borrow",this.borrowBook);
	},
	//加载图书页数
	loadPage(){
		$.post("/api/book/findpage",(data)=>{
			this.page=data.res_body.data;
			var html=`<li class="previous">
				      <a href="javascript:void(0);" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>`;
			for(var i=0;i<this.page;i++){
				if(i==0) html+=`<li class="active page"><a href="javascript:void(0);">${i+1}</a></li>`;
				else html+=`<li ><a class="page" href="javascript:void(0);">${i+1}</a></li>`;
			}
			html+=`<li class="next">
				      <a href="javascript:void(0);" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>`;
			$(".pagination").html(html);
		});
	},
	//按页加载图书信息
	loadByPage(page){
		page=page||1;
		//加载页面
		$.post("/api/book/findbypage",{page},(data)=>{
			//console.log(data);
			var html="";
			data.res_body.data.forEach((curr,index)=>{
				html+=`<tr>
 						<td class="id">${curr._id}</td>
						<td><img src="${curr.cover}" with="60"  height="60"}></td>
						<td>${curr.name}</td>
						<td>${curr.type}</td>
						<td class="number">${curr.number}</td>
						<td>${curr.price}</td>
						<td>${curr.publish}</td>
						<td>
							<a href="javascript:void(0);" title="" class="borrow"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>借阅</a>
						</td>
					</tr>
				`;
				$(".book-table tbody").html(html);
				$(".paginationHide").removeClass("hide");
			});

		});
	},
	//图书翻页处理
	loadByPageHandler(e){
		const src=e.target;
		const page=Number($(src).text())||1;
		this.loadByPage(page);
		$(src).parent().addClass("active").siblings().removeClass("active");
		return false;
	},
	//页面后退
	loadByPrevious(){
		var index=Number($(".pagination").children(".active").children("a").html());
		index=index>1?--index:1;
		this.loadByPage(index);
		$(".pagination").children("li:eq("+index+")").addClass("active").siblings().removeClass("active");
	},
	//页面前进
	loadByNext(){
		var index=Number($(".pagination").children(".active").children("a").html());
		//当前总页数
		maxIndex=this.page;
		index=index<maxIndex?++index:maxIndex;
		this.loadByPage(index);
		$(".pagination").children("li:eq("+index+")").addClass("active").siblings().removeClass("active");
	},
	//当前搜索类型
	chooseType(){
		var aaa=$(this).html();
		var type=$(this).attr("class");
		//console.log(type);
		$(".thistype").attr("what",type);
		$(".thistype").html(aaa+"<span class='caret'></span>");
	},
	//分类查找图书
	findBook(){
		let value=$(".findCondition").val();
		if(!$(".thistype").attr("what")) var key="_id";
		else var key=$(".thistype").attr("what");
		var obj={};
		obj.info=value;
		obj.type=key;
		//console.log(obj);
		let url ="/api/book/find";
		$.post(url,obj,(data)=>{
			//console.log(data);
			//获取查询后的数据渲染页面
			if(data.res_body.data.length){
				var html="";
				data.res_body.data.forEach((curr,index)=>{
					html+=`<tr>
	 						<td class="id">${curr._id}</td>
							<td><img src="${curr.cover}" with="60"  height="60"}></td>
							<td>${curr.name}</td>
							<td>${curr.type}</td>
							<td class="number">${curr.number}</td>
							<td>${curr.price}</td>
							<td>${curr.publish}</td>
							<td>
								<a href="javascript:void(0);" title="" class="borrow"><span class="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>借阅</a>
							</td>
						</tr>
					`;
					$(".book-table tbody").html(html);
					$(".paginationHide").addClass("hide");
				});
			}else{
				//alert("搜索不存在");
				let alter=`<div class="alert alert-warning alert-dismissible" role="alert" style="text-align:center">
							  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							  <strong>搜索不存在!</strong> 请重新输入
							</div>`;
				$(".allAlter").html(alter);
				setTimeout(function() {
					$(".allAlter").html("");
				},3000);
				
			}
		});
	},
	//借书
	borrowBook(){
		
		//获取当前图书编码
		var _id=$(this).parent().siblings(".id").html();
		//获取当前图书数量
		var number=$(this).parent().siblings(".number").html();
		//console.log(number);
		//记录修改前的图书
		var lastNum=number;
		//图书数量减少一个
		if(number<1) {
			number=0;
			let alter=`<div class="alert alert-warning alert-dismissible" role="alert" style="text-align:center">
							  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							  <strong>该书库存数量不足!</strong> 请选择其他图书
							</div>`;
				$(".allAlter").html(alter);
				setTimeout(function() {
					$(".allAlter").html("");
				},3000);
		}
		else number--;
		//改变数据库图书数据
		let url ="/api/book/update";
		$.post(url,{_id,number},function(data){
			console.log(data);
			//location.reload();
			//借阅标志改变
			$(this).parent().siblings(".number").html(number);
			if(lastNum!=0){
				let alter=`<div class="alert alert-success alert-dismissible" role="alert" style="text-align:center">
							  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							  <strong>借阅成功!</strong>
							</div>`;
				$(".allAlter").html(alter);
				$(this).children("span").attr("class","glyphicon glyphicon-heart");
				setTimeout(function() {
					$(".allAlter").html("");
				},3000);
			}
		}.bind(this));
	}
});

new User;