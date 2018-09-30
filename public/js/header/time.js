function Time(){
	this.init();
	this.timeAuto();
};

$.extend(Time.prototype,{
	init(){
		this.getTime();
		this.createDom();
	},
	createDom(){
		var template=`<div style="height:26px;width:100%;">
						<img src="/images/time.png" alt="" style="float:left;width:24px;">
						<p style="float:left;margin:0;font-size:14px;line-height:26px;">
							<span class="year">${this.year}</span>年<span class="mon">${this.mon}</span>月<span class="day">${this.day}</span>日
							<span class="hour">${this.hour}</span>:<span class="min">${this.min}</span>:<span class="second">${this.second}</span>
							<span class="week">${this.week}</span>
						</p>
					</div>`;
		$(".time").html(template);
	},
	getTime(){
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.mon = this.date.getMonth();
		this.day = this.date.getDate();
		this.week = this.getWeek(this.date.getDay());
		this.hour = this.date.getHours<10?"0"+this.date.getHours():this.date.getHours();
		this.min = this.date.getMinutes<10?"0"+this.date.getMinutes():this.date.getMinutes();
		this.second = this.date.getSeconds()<10?"0"+this.date.getSeconds():this.date.getSeconds();
		//console.log(this.week);
	},
	getWeek(number){
		const week = {
			1:"星期一",
			2:"星期二",
			3:"星期三",
			4:"星期四",
			5:"星期五",
			6:"星期六",
			0:"星期日"
		};
		return week[number];
	},
	timeAuto(){
		setInterval(this.init.bind(this),1000);
	}
});
/*var date = new Date();
	year = date.getFullYear(),
	mon = date.getMonth(),
	day = date.getDate(),
	week = date.getDay(),
	hour = date.getHours(),
	min = date.getMinutes(),
	second = date.getSeconds(),
console.log(year,mon,day,hour,min,second,week);*/