function User(){
	this.loadInfo();
	this.addListener();
};
$.extend(User.prototype,{
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
		$("li").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			const index = $(this).index();
			//console.log(index);
			$(".box").eq(index).removeClass("hidden").siblings().addClass("hidden");

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
	}
});

new User;