function Position(){
	this.init();
};

$.extend(Position.prototype,{
	page : 1,
	pageCount:1,
	init(){
		$(".click-positon").addClass("active").siblings().removeClass("active");
		//数据渲染到表格中 进入网页默认为第一页
		this.pageAll();
		this.pageLoad(this.page);
		this.addListener();
		//console.log(this.page);
	},
	//计算分页按钮的数量
	pageAll(){
		$.get("/api/position/findall",(data)=>{
			let pageNav = '';
			this.pageCount = Math.ceil(data.res_body.length/3);
			//console.log(data.res_body.length,pageCount);
			for(let i=1;i<=this.pageCount;i++){
				if(i===this.page)
				pageNav += `<li class="index active"><a href="#">${i}</a></li>`;
				else
				pageNav += `<li class="index"><a href="#">${i}</a></li>`;	
			}
			$(".prev").after(pageNav);
			//页码点击跳转
			$(".index").on("click",$.proxy(this.indexLoad,this));
			//上一页按钮点击
			$(".prev").on("click",$.proxy(this.prevNext,this));
			//下一页按钮点击
			$(".next").on("click",$.proxy(this.prevNext,this));
		});
	},
	pageLoad(page){
		//console.log(page);
		const url="/api/position/find";
		$.get(url,{page},(data)=>{
			//console.log(data.res_body);
			let html='';
			data.res_body.forEach((value,index)=>{
				html += `<tr>
			  		<td>${(page-1)*3+index+1}</td>
			  		<td><img src=${value.logo} /></td>
			  		<td>${value.name}</td>
			  		<td>${value.company}</td>
			  		<td></td>
			  		<td></td>
			  		<td>${value.address}</td>
			  		<td>${value.salary}</td>
			  		<td><a class="update" href="javascript:void(0)" data-toggle="modal" data-target="#updateModal">修改</a>  <a href="javascript:" class="delete">删除</a></td>
			  	</tr>`;
			});
			$("tbody").html(html);
			//修改职位按钮
			$(".update").on("click",this.fillUpdate);
			//删除职位按钮
			$(".delete").on("click",this.delete.bind(this));
		})
	},
	//页码点击跳转
	indexLoad(event){
		const src = event.target;
		this.page = $(src).parent().index();
		//console.log(this.page);
		this.pageLoad(this.page);
		$(src).parent().addClass("active").siblings().removeClass("active");
		this.indexActive();
	},
	//上下页切换
	prevNext(event){
		event.stopPropagation();
		const src = event.target;
		$(src).parent().index()==0?this.page--:this.page++;
		if(this.page<1)
			this.page=1;
		else if(this.page>this.pageCount)
			this.page=this.pageCount;
		this.pageLoad(this.page);
		$(".page-click li").eq(this.page).addClass("active").siblings().removeClass("active");
		this.indexActive();
	},
	//判断页码状态
	indexActive(){
		if (this.page==1)
			$(".prev").addClass("disabled").siblings().removeClass("disabled");
		if(this.page==this.pageCount)
			$(".next").addClass("disabled").siblings().removeClass("disabled");
	},
	//添加管理员
	posHandler(){
		let formData = new FormData($(".publish-form")[0]);
		const url = "/api/position/publish";
		//console.log(formData);
		_this=this;
		$.ajax({
			data:formData,
			url,
			type:"post",
			contentType:false,
			processData:false,
			success(data){
				$("#publishModal").modal("hide");
				_this.pageLoad(_this.page);
			}
		});
	},
	fillUpdate(){
		//const src = event.target;
		const name = $(this).parent().parent().children().eq(2).html();
		$(".pos-name").val(name);
	},
	//添加监听事件
	addListener(){
		//添加职位按钮
		$(".position-btn").on("click",this.posHandler.bind(this));
	}
});

new Position();