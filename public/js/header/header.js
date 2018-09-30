function Header(){
	this.createDom();
	this.isLogin();
	this.addListener();
	this.time();
};

//头部模板
Header.template=`<nav class="navbar navbar-inverse" style="margin-bottom:10px !important;">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <img src="/images/header.png" width="50" style="float:left">
	      <a class="navbar-brand" href="#" style="margin-left:5px;">ZHsy图书管理系统</a>
	    </div>

	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

	      <ul class="nav navbar-nav navbar-right login-reg-link">
	        <li data-toggle="modal" data-target="#loginModal" class="modal-login"><a href="#">登录</a></li>
	        <li data-toggle="modal" data-target="#RegModal"><a href="#">注册</a></li>
	      </ul>
	       <ul class="nav navbar-nav navbar-right hidden welcome-logout-link">
	        <li><a href="#">欢迎：</a></li>
	        <li><a href="javascript:void(0)" class="logout-link"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>&nbsp;&nbsp;注销</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
	<div class="time"></div>
	`;

$.extend(Header.prototype,{
	//创建头部
	createDom(){
		$(Header.template).appendTo("header");
	},
	//判断用户是否登录 改变头部信息
	isLogin(){
		let loginUser = sessionStorage.loginUser;
		if(!loginUser)
			return;
		loginUser = JSON.parse(loginUser);
		$(".login-reg-link").addClass("hidden")
			.siblings(".welcome-logout-link").removeClass("hidden")
			.find("a:first").text("欢迎：" + loginUser.name);
	},
	logout(){
		$.get("/api/logout",(data)=>{
			console.log(data);
			if(data.res_code===1){
				sessionStorage.removeItem("loginUser");
				// 刷新
				window.location.href = "/";
			}
		});	
	},
	addListener(){
		$(".logout-link").on("click",this.logout);
	},
	time(){
		new Time();
	}
});

new Header();

