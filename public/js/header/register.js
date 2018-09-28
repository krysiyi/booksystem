function Register(){
	this.creatDom();
	this.load();
	this.addListener()
};

Register.template = `<div class="modal fade" id="RegModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
			    <input type="password" class="form-control" name="password" placeholder="输入密码">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">确认密码</label>
			    <input type="password" class="form-control" id="repassword" placeholder="再次输入密码">
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
			      <input type="text" class="form-control captcha-input"placeholder="请输入验证码">
				  <span class="input-group-addon" id="result">正确</span>
				</div>
				<div class="captcha"></div>
			</div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary register-btn">注册</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->`;

$.extend(Register.prototype,{
	creatDom(){
		$(Register.template).appendTo("body");
	},
	//载入验证码
	load(){
		/*$.getJSON("/api/captcha",(data)=>{
			$(".captcha").html(data.res_body.data);
		});*/
	},
	//添加监听
	addListener(){
		//注册按钮点击
		$(".register-btn").on("click",this.regHandler);
		//点击验证码刷新验证码	
		$(".captcha").on("click",this.load);
		//失去焦点验证是否正确
		//$(".captcha-input").on("blur",this.verify);
	},
	regHandler(){
		const url="/api/register",
			data = $(".register-form").serialize() + "&level=0";
		$.post(url,data,(data)=>{
			console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 注册成功，即登录成功
				// 将注册成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				// 刷新页面
				window.location.reload();
			} else { // 注册失败
				$(".register-error").removeClass("hidden");
			}
		});
	}
});
