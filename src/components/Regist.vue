<template>
	<div class="regist">
			<div class="top">
				 <span class="return" @click="goback"> &lt; </span>
				 <span class="zhuce">注册</span>
			</div>
			<div class="form-part">
					<form class="form">
						  <input class="inp" type="text" placeholder="姓名" v-model="uname">
						  <input class="inp" type="text" placeholder="微信昵称" v-model="wechatName">
							<div class="inpx">
								<input class="inpx-l" type="text" placeholder="微信号" v-model="wechatId">
								<input class="inpx-r" type="button" value="获取">
							</div>
							<input class="inp" type="text" placeholder="钱包地址" v-model="address">
							<input class="inp" type="number" placeholder="联系电话" v-model="phone">
						  <div class="inpx">
								<input class="inpx-l" type="number" placeholder="验证码" v-model="code">
								<input class="inpx-r" type="button" value="获取验证码" @click="clock" ref="clock" :style="clockStyle">
							</div>
							<div class="inp-file">
								 <div class="file-uplaod">
									   <div class="add">
											  <img src="../assets/img/upload_file.png" alt="">
										 </div>
										 <span>上传个人简历(需小于500M)</span>
								 </div>
								<input type="file" class="file" @change="fileSelected" id="fileToUpload"/>
								<div>{{fileName}}---{{fileSize}}</div>
							</div>
							<div class="tip">
								 	 <input type="checkbox"  class="checkbox" checked/>
									 <span>我已阅读</span><span style="color:#00AAEE" @click="optiondetail">《使用说明》</span>
							</div>
							<input type="button" value="提交" class="submit" @click="regist">
					</form>

			</div>
			<div class="tips" v-show="showss">审核成功进行...</div>
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
						color:"white",	
				 },
				 showss:false,
				 clocks:120,
				 uname:"",
				 wechatName:"",
				 wechatId:"",
				 address:"",
				 phone:"",
				 code:"",
				 fileName:"",
				 fileSize:"",
				 fileType:"",
				 file:""
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
				this.clockStyle.backgroundColor="gray";
				this.clockStyle.border="1px solid gray";
				var sum=this.clocks;
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
			},
			regist(){
				 this.showss= true;
				 var _this = this;
				 console.log(111)
				 setTimeout(function(){
					 _this.showss = false
				 },1000)
			},
			fileSelected(){
				
				this.file = document.getElementById('fileToUpload').files[0];
				console.log(this.file)
				if(this.file === undefined){
						this.fileName = '';
						this.fileSize = '';
						this.fileType = '';
				}else{
						this.fileName = this.file.name;
						//kb
						if(this.file.size/1024<1000){
								this.fileSize = (this.file.size/1024).toFixed(2) +"kb";
								console.log(this.fileSize)
						}
						else if(this.file.size/1024>1000){
								this.fileSize = ((this.file.size/1024)/1024).toFixed(2) +"MB";
						}
						this.fileType = this.file.type;
						
				}
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
							width:20px;
							height: 20px;
							margin-bottom: 10px;
							img{
								 width:100%;
								 height: 100%;
							}
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
						-webkit-appearance:checkbox;
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
				 border:1px solid #00AAEE;
			}
		}
	}
	.tips{
		 position: absolute;
		  background-color: #00AAEE;
		 color:white;
		 text-align: center;
		 width:200px;
		 height: 50px;
		 line-height: 50px;
		 left:50%;
		 top:50%;
		 margin-left: -100px;
		 margin-top: -25px;
		 border-radius: 5px;
	}
}

</style>
