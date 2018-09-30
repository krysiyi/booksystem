function Index(){
	this.reg();
	this.addListener();
	this.load();		
};

$.extend(Index.prototype,{
	addListener(){
		$(".login-btn").attr("disabled","disabled");
		$(".login-btn").on("click",this.login);
		//点击验证码刷新验证码	
		$(".recaptcha").on("click",this.load);
		//失去焦点验证是否正确
		$(".captcha-input").on("keyup",this.verify);
		$(".close").on("click",this.load);
		$(".close").on("click",this.verify);
	},
	login(){
		const url = "/api/login"
		const data = $(".login-form").serialize();
		const level = $(".login-form select").val();
		$.post(url,data,(data)=>{
			if(data.res_code===0){
				$(".login-error").removeClass("hidden");
				setTimeout(()=>{
					$(".login-error").addClass("hidden");
				},1500);
			}else{
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				if(level==0)
				window.location.href = "/html/user/user.html";
				if(level==1)
				window.location.href = "/html/manager/manager.html";
				//console.log(sessionStorage.loginUser);
			}
		});
	},
	reg(){
		new Register;
	},
	//载入验证码
	load(){
		$.getJSON("/api/captcha",(data)=>{
			$(".captcha").html(data.res_body.data);
		});
	},
	//验证验证码
	verify(){
		$.getJSON("/api/verifycaptcha",{captcha:$(this).val()},(data)=>{
			if(data.res_body.valid===false){
				$("#result").html("错误");
				$(".login-btn").attr("disabled","disabled");
			}
			else{
				$("#result").html("正确");
				$(".login-btn").removeAttr("disabled");
			}	
		});
	}
});

new Index();