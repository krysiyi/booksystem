function Register(){
	this.creatDom();
	this.addListener()
};

Register.template = `<div class="modal fade" id="RegModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="close">&times;</span></button>
	        <h4 class="modal-title">用户注册</h4>
	      </div>
	      <div class="modal-body">
	       <div class="alert alert-danger hidden register-error">注册失败</div>
	        <form class="register-form">
			  <div class="form-group">
			    <label for="exampleInputEmail1">用户名</label>
			    <input type="text" class="form-control" name="name" placeholder="输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">密码</label>
			    <input type="password" class="form-control password" name="password" placeholder="输入密码">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">确认密码</label><span class="prompt hidden" style="color:red;">*两次输入密码不一致</span>
			    <input type="password" class="form-control repassword" placeholder="再次输入密码">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputEmail1">性别</label>
			    <input type="text" class="form-control" name="sex" placeholder="输入性别">
			  </div>
			   <div class="form-group">
			    <label for="exampleInputEmail1">年龄</label>
			    <input type="text" class="form-control" name="age" placeholder="输入年龄">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputEmail1">电话</label>
			    <input type="text" class="form-control" name="tel" placeholder="输入电话号码">
			  </div>  
			</form>
			<div class="form-group">
			    <label for="loginCaptcha">验证码</label>
			    <div class="input-group">
			      <input type="text" class="form-control captcha-register"placeholder="请输入验证码">
				  <span class="input-group-addon register-result">未输入验证码</span>
				</div>
				<div class="captcha2"></div>
			</div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary register-btn" disabled="disabled">注册</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->`;

$.extend(Register.prototype,{
	flag:[false,false],
	creatDom(){
		$(Register.template).appendTo("body");
	},
	//载入验证码
	load(){
		$.getJSON("/api/captcha",(data)=>{
			$(".captcha2").html(data.res_body.data);
		});
	},
	//验证验证码
	verify(){
		console.log($(".captcha-register").val());
		$.getJSON("/api/verifycaptcha",{captcha:$(".captcha-register").val()},(data)=>{
			if(data.res_body.valid===false){
				$(".register-result").html("错误");
				this.flag[0]=false;
				//$(".register-btn").attr("disabled","disabled");	
			}
			else{
				$(".register-result").html("正确");
				this.flag[0]= true;
				//$(".register-btn").removeAttr("disabled");
			}
			if(this.flag.every((value)=>{return value}))
			$(".register-btn").removeAttr("disabled");
			else
			$(".register-btn").attr("disabled","disabled");
		});
	},
	//添加监听
	addListener(){
		//第二次输入密码是否一致
		$(".repassword").on("blur",this.check.bind(this));
		//注册按钮点击
		$(".register-btn").on("click",this.regHandler);
		//点击验证码刷新验证码	
		$(".captcha2").on("click",this.load);
		//失去焦点验证是否正确
		$(".captcha-register").on("keyup",this.verify.bind(this));
		$(".register").on("click",this.load);
	},
	check(e){
		const password = $(".password").val();
		const repassword = $(e.target).val();
		if(password!=repassword){
			$(".prompt").removeClass("hidden");
			//$(".register-btn").attr("disabled","disabled");
			this.flag[1]=false;
		}else{
				$(".prompt").addClass("hidden");
				this.flag[1]=true;
				//$(".register-btn").removeAttr("disabled");
		}
		//console.log(this.flag);
		if(this.flag.every((value)=>{return value}))
		$(".register-btn").removeAttr("disabled");
		else
		$(".register-btn").attr("disabled","disabled");
	},
	regHandler(){
		const url="/api/register",
			data = $(".register-form").serialize() + "&level=0";
		$.post(url,data,(data)=>{
			//console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 注册成功，即登录成功
				// 将注册成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				// 刷新页面
				window.location.href = "/html/user/user.html";
			} else { // 注册失败
				$(".register-error").removeClass("hidden");
			}
		});
	}
});
