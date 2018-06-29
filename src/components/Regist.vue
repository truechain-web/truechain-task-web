<template>
	<div class="regist">
			<div class="top">
				 <span class="return" @click="goback"> &lt; </span>
				 <span class="zhuce">注册</span>
			</div>
			<div class="form-part">
					<form class="form">
						  <input class="inp" type="text" placeholder="姓名">
						  <input class="inp" type="text" placeholder="微信昵称">
							<div class="inpx">
								<input class="inpx-l" type="text" placeholder="微信号">
								<input class="inpx-r" type="button" value="获取">
							</div>
							<input class="inp" type="text" placeholder="钱包地址">
							<input class="inp" type="number" placeholder="联系电话">
						  <div class="inpx">
								<input class="inpx-l" type="number" placeholder="验证码">
								<input class="inpx-r" type="button" value="获取验证码" @click="clock" ref="clock" :style="clockStyle">
							</div>
							<div class="inp-file">
								 <div class="file-uplaod">
									   <div class="add"></div>
										 <span>上传个人简历(需小于500M)</span>
								 </div>
								<input type="file" class="file"/>
							</div>
							<div class="tip">
								 	<input type="checkbox" checked class="checkbox"/>
									 <span>我已阅读</span><span style="color:#00AAEE" @click="optiondetail">《使用说明》</span>
							</div>
							<input type="button" value="提交" class="submit">
					</form>

			</div>
	</div>
</template>

<script>
	export default{
		name: 'Regist',
		data () {
			return {
				 clockStyle:{
						backgroundColor:"#FFAE0F",
						border:"1px solid #FFAE0F",
						color:"white"
				 }
			}
		},
		methods:{
			optiondetail(){
				this.$router.push({path:"optiondetail"})
			},
			goback(){
				this.$router.go(-1)
			},
			clock(){
				console.log(11)
				this.clockStyle.backgroundColor="gray";
				this.clockStyle.border="1px solid gray";
				var sum=10;
				var _this = this
				var dom =  _this.$refs.clock
				var times = setInterval(function(){
					 dom.value=sum +"s"
					 if (sum === 0){
							 dom.value="获取验证码"
							 	_this.clockStyle.backgroundColor="#FFAE0F";
								_this.clockStyle.border="1px solid #FFAE0F";
						 	 clearInterval(times);
					 }
					 sum--;
				},1000)
			}
		}
	}
</script>
<style scoped lang="less">
.regist{
	.top{
			text-align: center;
			position: relative;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid #E0E4E5;
		 .return{
				font-family:'Courier New', Courier, monospace;
				font-size:20px;
				color:#00AAEE;
				position:absolute;
				left:20px;
				top:10px;
		 }
		 .zhuce{
			 font-size: 20px;
		 }
	}
	.form-part{
		.form{
			display: flex;
			flex-direction: column;
			align-items: center;
			.inp{
				width:90%;
				height: 40px;
				font-size:15px;
				background-color: #FAFAFA;
				border:1px solid #E7E7E7;
				border-radius: 5px;
				margin-top:20px;
				padding-left: 10px;
				box-sizing: border-box;
			}
			.inpx{
				margin-top:20px;
				width:90%;
				height: 40px;
				font-size:15px;
				display: flex;
				.inpx-l{
						width:70%;
						background-color: #FAFAFA;
						border:1px solid #E7E7E7;
						border-top-left-radius: 5px;
						border-bottom-left-radius: 5px;
						height: 100%;
						box-sizing: border-box;
						padding-left: 10px;
							font-size:15px;
				}
				.inpx-r{
					 	width:30%;
						background-color: #FFAE0F;
						border:1px solid #FFAE0F;
						height: 100%;
						font-size:15px;
						border-top-right-radius: 5px;
						border-bottom-right-radius: 5px;
						color:white;
				}
			}
			.inp-file{
				height: 100px;
				width: 90%;
				background-color: #FAFAFA;
				margin-top:20px;
				border-radius: 5px;
				position: relative;
				border:1px solid #E7E7E7;
				 .file{
					 position: absolute;
					 width:100%;
					 height: 100%;
					 opacity: 0;
					 top:0;
					 left:0;
				 }
				 .file-uplaod{
					 width:100%;
					 height: 100%;
					 display: flex;
					 color:#A1ACB4;
					 font-size: 13px;
					 align-items: center;
					 justify-content: center;
					 flex-direction: column;
					 .add{
							width:30px;
							height: 30px;
							border: 1px solid gray;
					 }
				 }
			}
			.tip{
					width:90%;
					text-align: left;
					font-size:15px;
					margin-top:20px;
					color:#A1ACB4;
					.checkbox{
						width: 15px;
						height: 15px;
					}
			}
			.submit{
				 width:90%;
				 background-color: #00AAEE;
				 font-size: 15px;
				 color:white;
				 border-radius: 5px;
				 height: 40px;
				 margin-top:20px;
			}
		}
	}
}

</style>
