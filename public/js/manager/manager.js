function Book(){
	this.addListener();
}
$.extend(Book.prototype,{
	init(){
		//$(".position-page").addClass("active").siblings().removeClass("active");
		/*this.loadByPage(1);
		this.loadPage();*/
	},
	addListener(){
		//点击翻页处理
		//$(".pagination").on("click",".page",this.loadByPageHandler.bind(this));
		//添加图书
		$(".btn-add-book").on("click",this.addBookHandler);
		//修改职位
		//$(".btn-update-pos").on("click",this.updateProHandler);
		
	},
	//按页加载图书信息
	loadByPage(page){
		//$(".previous").removeClass("disabled");
		page=page||1;

		//加载页面
		$.post("/api/book/findbypage",{page},(data)=>{
			//console.log(data);
			/*var html="";
			data.res_body.data.forEach((curr,index)=>{
				html+=`<tr>
 						<td>${curr._id}</td>
						<td>${curr.cover}</td>
						<td>${curr.name}</td>
						<td>${curr.type}</td>
						<td>${curr.number}</td>
						<td>${curr.price}</td>
						<td>${curr.publish}</td>
						<td>
							<a href="javascript:void(0);" title="" class="updateBook" data-toggle="modal" data-target="#updateModal">修改</a>
							<a href="javascript:void(0);" title="" class="removeBook">删除</a>
						</td>
					</tr>
				`;
				$(".book-table tbody").html(html);
			});*/
			
			/*//删除职位
			$(".removePro").on("click",this.removePosHandler);
			//修改职位
			$(".updatePro").on("click",this.nowMess);*/
		});
	},
	//添加图书
	addBookHandler(){
		let formData=new FormData($(".add-book-form")[0]);
		let url ="/api/book/publish";
		$.ajax({
			type:"post",
			url,
			data:formData,
			dataType:"json",
			processData:false,
			contentType:false,
			success(data){
				console.log(data);
				/*const curr = data.res_body.data;
				//添加数据渲染页面
				const html+=`<tr>
 						<td>${curr._id}</td>
						<td>${curr.cover}</td>
						<td>${curr.name}</td>
						<td>${curr.type}</td>
						<td>${curr.number}</td>
						<td>${curr.price}</td>
						<td>${curr.publish}</td>
						<td>
							<a href="javascript:void(0);" title="" class="updateBook" data-toggle="modal" data-target="#updateModal">修改</a>
							<a href="javascript:void(0);" title="" class="removeBook">删除</a>
						</td>
					</tr>`;
				//if($(".position-table tbody").children())
				$(".book-table tbody").append(html);
				// 关闭模态框
				$("#addModal").modal("hide");
				//window.location.reload();*/
			}
		});
	},
});

new Book();
