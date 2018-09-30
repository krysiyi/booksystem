function Book(){
	this.addListener();
	this.init();
}
$.extend(Book.prototype,{
	tab:0,
	init(){
		$(".position-page").addClass("active").siblings().removeClass("active");
		this.loadByPage(1);
		this.loadPage();
	},
	addListener(){
		//点击翻页处理
		$(".pagination").on("click",".page",this.loadByPageHandler.bind(this));
		//添加图书
		$(".btn-add-book").on("click",this.addBookHandler.bind(this));
		//页面后退
		$(".pagination").on("click",".previous",this.loadByPrevious.bind(this));
		//页面前进
		$(".pagination").on("click",".next",this.loadByNext.bind(this));
		//删除职位
		$("tbody").on("click",".removeBook",function(e){
			if(confirm("确认删除吗?")){
				this.removeBookHandler(e.target);
			}
		}.bind(this));
		//点击修改获取当前图书信息
		$("tbody").on("click",".updateBook",this.nowId);
		//修改职位
		$(".btn-update-book").on("click",this.updateBookHandler.bind(this));
		//搜索类型
		$(".chooseType").on("click","a",this.chooseType);
		//搜索
		$(".find").on("click",this.findBook.bind(this));
		//重新加载全部图书信息
		$(".reload").on("click",this.init.bind(this));
		//内容切换
		$(".change-content").on("click","li",this.changeContent.bind(this));
		
		//查看借书详情
		$(".user-table").on("click",".seemore",this.bookDetails.bind(this));
		//增加管理员
		$(".btn-add-manager").on("click",this.addManager.bind(this));
		//获取当前管理员信息
		$("tbody").on("click",".updateManager",this.nowManager);
		//更新管理员信息
		$(".update-btn").on("click",this.updateManager.bind(this));
		//修改密码按钮
		$(".password-btn").on("click",this.changePassword.bind(this));
	},
	success(text){
		$(".update-success").html(text);
		$(".update-success").removeClass("hidden");
		setTimeout(()=>{
			$(".update-success").addClass("hidden");
		},1500);
	},
	error(text){
		$(".update-error").html(text);
		$(".update-error").removeClass("hidden");
		setTimeout(()=>{
			$(".update-error").addClass("hidden");
		},1500);
	},
	addManager(){
		$("#addmanagerModal").modal("hide");
		const data = $(".add-manager-form").serialize()+"&level=1";
		//console.log(data);
		const url="/api/register";
		$.post(url,data,(data)=>{
			//console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 注册管理员成功
				this.success('注册管理员成功');
			} else { // 注册失败
				this.error('注册管理员失败');
			}
		});
	},	
	bookDetails(e){
		const src = e.target;
		const name = $(src).parent().siblings(".username").html();
		$.post("/api/find",{name,level:0},(data)=>{
			if(data.res_code ===1){
				//console.log(data.res_body);
				if(data.res_body.data[0].book.length===0){
					var html = `<p>该用户暂未借阅图书</p>`;
					$(".details-table").html(html);
				}else{
					var arr=data.res_body.data[0].book;
					console.log(arr);
					var html="";
					for(var key in arr){
						html+=`<tr>
						<td>${arr[key].id}</td>
						<td>${arr[key].bookname}</td>
						<td>${arr[key].borrow_time}</td>
						</tr>`;
					}
					$(".details-table tbody").html(html);
				}	
			}
		});
	},
	//修改密码操作
	changePassword(){
		//获取两次输入的密码，判断是否一致
		var newPwd=$("#newPwd").val();
		if($("#againNewPwd").val()===newPwd){
			const name = JSON.parse(sessionStorage.loginUser).name;
			const data = $(".password-form").serialize()+"&level=1&name="+name;
			//console.log(data);
			const url="/api/update/";
			$.post(url,data,(data)=>{
				if(data.res_code===1){
					// 修改成功
					this.success("修改密码成功,请重新登录");
					setTimeout(()=>{
						$.get("/api/logout",(data)=>{
							if(data.res_code===1){
								sessionStorage.removeItem("loginUser");
								// 刷新
								window.location.href = "/";
							}
						});
					},1500);
				}else{
					this.error("原密码错误，请重新尝试");
				}	
			});
		}else{
			this.error('两次密码输入不一致');
		}
		
	},
	//当前搜索类型
	chooseType(){
		var aaa=$(this).html();
		var type=$(this).attr("class");
		//console.log(aaa);
		$(".thistype").attr("what",type);
		//console.log($(".thistype").attr("what"));
		$(".thistype").html(aaa+"<span class='caret'></span>");
	},
	//加载页数
	loadPage(){
		if(this.tab ===0){
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
		}else if(this.tab ===1){
			$.post("/api/find",{name:"kry",level:0},(data)=>{
				//console.log(data);
				this.page = Math.ceil(data.res_body.data.length/3);
				var html =`<li class="previous">
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
		}
		
	},
	//按页加载图书信息
	loadByPage(page){
		page=page||1;
		//加载页面
		//console.log(this.tab);
		if(this.tab === 0){
			//获取图书信息
			$.post("/api/book/findbypage",{page},(data)=>{
			//console.log(data);
			var html="";
			data.res_body.data.forEach((curr,index)=>{
					html+=`<tr>
	 						<td class="id">${curr._id}</td>
							<td><img src="${curr.cover}" with="60"  height="60"}></td>
							<td>${curr.name}</td>
							<td>${curr.type}</td>
							<td>${curr.number}</td>
							<td>${curr.price}</td>
							<td>${curr.publish}</td>
							<td>
								<a href="javascript:void(0);" title="" class="updateBook" data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
								<a href="javascript:void(0);" title="" class="removeBook"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
							</td>
						</tr>
					`;
					$(".book-table tbody").html(html);
					$(".paginationHide").removeClass("hide");
				});
			});
		}else if(this.tab===1){
			//获取普通用户信息
			$.post("/api/find",{page},(data)=>{
			//console.log(data);
			var html="";
			data.res_body.forEach((curr,index)=>{
					html+=`<tr>
	 						<td class="username">${curr.name}</td>
							<td>${curr.sex}</td>
							<td>${curr.age}</td>
							<td>${curr.tel}</td>
							<td>${curr.reg_time}</td>
							<td>
							<button type="button" class="btn btn-primary seemore" data-toggle="modal" data-target="#userdetailModal">查看详情</button>
							</td>
						</tr>
					`;
					$(".user-table tbody").html(html);
					$(".paginationHide").removeClass("hide");
				});
			});
		}else if(this.tab===2){
			//获取管理员信息
			var name=JSON.parse(sessionStorage.loginUser).name;
			$.post("/api/find",{name,level:1},(data)=>{
				//console.log(data);
				var html="";
				html+=`<tr>
						<td class="username">${data.res_body.data[0].name}</td>
						<td>${data.res_body.data[0].sex}</td>
						<td>${data.res_body.data[0].age}</td>
						<td>${data.res_body.data[0].tel}</td>
						<td>${data.res_body.data[0].reg_time}</td>
						<td>
							<a href="javascript:void(0);" title="" class="updateManager" data-toggle="modal" data-target="#updateManagerModal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
						</td>
					</tr>
				`;
				$(".manager-table tbody").html(html);
				$(".paginationHide").removeClass("hide");
				
				
			});
		}
		
	},
	//翻页处理
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
		$(".new-pagination").children("li:eq("+index+")").addClass("active").siblings().removeClass("active");
	},
	//页面前进
	loadByNext(){
		var index=Number($(".pagination").children(".active").children("a").html());
		//当前总页数
		maxIndex=this.page;
		index=index<maxIndex?++index:maxIndex;
		this.loadByPage(index);
		$(".pagination").children("li:eq("+index+")").addClass("active").siblings().removeClass("active");
		$(".new-pagination").children("li:eq("+index+")").addClass("active").siblings().removeClass("active");
	},
	//添加图书
	addBookHandler(){
		let formData=new FormData($(".add-book-form")[0]);
		let url ="/api/book/publish";
		var _this=this;
		$.ajax({
			type:"post",
			url,
			data:formData,
			dataType:"json",
			processData:false,
			contentType:false,
			success(data){
				// 关闭模态框
				$("#addModal").modal("hide");
				if(data.res_code===1){
					_this.loadByPage();
					_this.loadPage();
					_this.success('添加图书成功');
				}else{
					_this.error('添加图书失败');
				}
			}
		});
	},
	//删除图书
	removeBookHandler(e){
		var _id=$(e).parent().parent().siblings(".id").html();
		//console.log(_id);
		let url ="/api/book/delete";
		$.post(url,{_id},(data)=>{
			//console.log(data);
			if(data.res_code==1){
				this.loadByPage();
				this.loadPage();
				this.success('删除图书成功');
			}else{
				this.error('删除图书失败');
			}
			
		});
	},
	//获取当前点击图书id
	nowId(){
		var _id=$(this).parent().siblings(".id").html();
		$(".update-book-form #updateBookId").val(_id);
	},
	//获取当前点击管理员用户名
	nowManager(){
		console.log($(this).parent().parent().children("td:eq(0)").html());
		$(".update-form #nowManagerName").val($(this).parent().parent().children("td:eq(0)").html());
		$(".update-form #nowManagerSex").val($(this).parent().parent().children("td:eq(1)").html());
		$(".update-form #nowManagerAge").val($(this).parent().parent().children("td:eq(2)").html());
		$(".update-form #nowManagerTel").val($(this).parent().parent().children("td:eq(3)").html());
	},
	//修改图书
	updateBookHandler(){
		let formData=new FormData($(".update-book-form")[0]);
		let url ="/api/book/update";
		var _this=this;
		$.ajax({
			type:"post",
			url,
			data:formData,
			dataType:"json",
			processData:false,
			contentType:false,
			success(data){
				// 关闭模态框
				if(data.res_code===1){
					_this.loadPage();
					_this.loadByPage();
					_this.success('修改图书成功');
				}else{
					_this.error('修改图书失败');
				}
				$("#updateModal").modal("hide");
			}
		});
	},
	//分类查找图书
	findBook(){
		let value=$(".findCondition").val();
		if(!$(".thistype").attr("what"))
		{var key = "_id";
			}else{
				var key = $(".thistype").attr("what");
			}
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
							<td>${curr.number}</td>
							<td>${curr.price}</td>
							<td>${curr.publish}</td>
							<td>
								<a href="javascript:void(0);" title="" class="updateBook" data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a>
								<a href="javascript:void(0);" title="" class="removeBook"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
							</td>
						</tr>
					`;
					$(".book-table tbody").html(html);
					$(".paginationHide").addClass("hide");
				});
			}else{
				this.error('没有查询的图书');
			}
		});
	},
	//切换内容刷新（选项卡）
	changeContent(e){
		var src = e.target;
		src = $(src).parent();
		$(src).addClass("active").siblings().removeClass("active");
		var index=$(src).index();
		this.tab = index;
		if(index==0) $(".book_manage").css("display","block").siblings("div").css("display","none");
		else if(index==1) $(".message_manage").css("display","block").siblings("div").css("display","none");
		else if(index==2) $(".person_manage").css("display","block").siblings("div").css("display","none");
		else $(".pwd_manage").css("display","block").siblings("div").css("display","none");
		this.loadByPage(1);
		this.loadPage();
	},
	//修改管理员信息
	updateManager(){
		$("#updateManagerModal").modal("hide");
		const data = $(".update-form").serialize()+"&level=1";
		//console.log(data);
		const url="/api/update";
		$.post(url,data,(data)=>{
			//修改成功，查询渲染页面
			// 处理响应数据
			if (data.res_code === 1) { // 修改管理员成功
				this.loadPage();
				this.loadByPage();
				this.success('修改管理员信息成功');
			} else { // 注册失败
				this.error('修改管理员信息成功失败');
			}
		});
	}
});

new Book();
