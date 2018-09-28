图书管理系统
一、登录界面
用户/管理员
账号：
密码：

二、用户界面
-图书详情（可借阅图书）
-用户信息（个人账号信息 可修改部分信息  图书借阅详情）
-密码修改

三、管理员界面
-图书管理（可修改图书信息）
-用户管理（管理各个用户账号 可添加管理员）
-密码修改

==========================================================


数据库设计（bookSystem）
管理员表（manager）
-name 主键
-password
-sex
-age
-tel
-reg_time

用户表(user)
-name 主键
-password
-sex
-age
-tel
-book{bookid:number,bookid:number,bookid:number}
-reg_time

图书表（book）
-_id  主键(NO.xxxx)
-book_name
-type
-number
-price
-publish
-cover

==========================================================

用户接口：

注册：
	接口：/api/register
	请求方式：POST
	请求参数：
		-level
		-user_name / -manager_name
		-password
		-sex
		-age
		-tel

	返回JSON：
		{
			"res_code" : 1, // 1表示注册成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"data" : {
					"user_name"
					"password"
					"sex"
					"age"
					"tel"
					"reg_time": "" // 注册时间
				}
			}
		}

登录：
	接口：/api/login
	请求方式：POST
	请求参数：
		-level(用户/管理员)
		-user_name / -manager_name
		-password
	返回JSON：
		{
			"res_code" : 1, // 1表示登录成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"data" : {
					"user_name"
					"password"
					"sex"
					"age"
					"tel"
					"reg_time": "" // 注册时间
				}
			}
		}

注销：
	接口：/api/logout
	请求方式：GET
	请求参数：
	返回JSON：
		{
			"res_code" : 1, // 1表示注销成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"status" : true // 注销成功还是失败   true成功
			}
		}


==========================================================

管理员 

图书管理

添加图书：
	接口：/api/book/publish
	请求方式：POST
	请求参数：
		-_id  主键(NO.0001)
		-book_name
		-type
		-number
		-price
		-publish
		-cover
	返回JSON：
		{
			"res_code" : 1, // 1表示发布成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"data" : {
					-_id  主键(NO.0001)
					-book_name
					-type
					-number
					-price
					-publish
					-cover
				}
			}
		}

修改图书信息：
	接口：/api/book/update
	请求方式：POST
	请求参数：
		-_id  主键(NO.0001)
		-book_name
		-type
		-number
		-price
		-publish
		-cover
	返回JSON：
		{
			"res_code" : 1, // 1表示修改成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"data" : {
					-_id  主键(NO.0001)
					-book_name
					-type
					-number
					-price
					-publish
					-cover
				}
			}
		}

删除图书：
	接口：/api/book/delete
	请求方式：GET
	请求参数：
		_id - 待删除图书的主键值 编号
	返回JSON：
		{
			"res_code" : 1, // 1表示修改成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"status" : true // 删除成功/失败
			}
		}

获取总页码数：
	接口：/api/book/findallpage
		请求方式：GET
		请求参数：
		返回JSON：
			{
				"res_code" : 1, // 1表示查询成功，否则失败
				"res_error" : "", // 失败时的错误信息
				"res_body" : { // 响应主体
					number
				}
			}

按页查询职位：
	接口：/api/book/findbypage
	请求方式：GET
	请求参数：
		page - 待查询的页码
	返回JSON：
		{
			"res_code" : 1, // 1表示查询成功，否则失败
			"res_error" : "", // 失败时的错误信息
			"res_body" : { // 响应主体
				"data" : [
					{
						-_id  主键(NO.0001)
					-book_name
					-type
					-number
					-price
					-publish
					-cover
					},
					{
						-_id  主键(NO.0002)
					-book_name
					-type
					-number
					-price
					-publish
					-cover
					},...
				]
			}
		}

