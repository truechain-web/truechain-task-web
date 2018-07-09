<template>
  <div class="login">
		  <div class="top">
				 <span class="denglu">登录</span>
			</div>
		  <div class="login-inp">
				<div ><input type="text" class="inp" v-model="uname" placeholder="电话号码"/></div>
				<div class="inpx">
						<input class="inpx-l" type="number" placeholder="验证码" v-model="code">
						<input class="inpx-r" type="button" value="获取验证码" @click="clock" ref="clock" :style="clockStyle">
				</div>
				<div class="tip">
						<input type="checkbox"  class="checkbox" checked/>
						<span>我已阅读</span><span style="color:#00AAEE" @click="optiondetail">《使用说明》</span>
				</div>
			</div>
			<div class="login-submit">
				 <input type="button" value="登录" class="submit" @click="login">
				 <input type="button" value="注册" class="submit" style="background-color:#FFAE0F;border:1px solid #FFAE0F" @click="regist">
			</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
			 uname:"",
			 code:"",
			 clocks:120,
			 clockStyle:{
					backgroundColor:"#FFAE0F",
					border:"1px solid #FFAE0F",
					color:"white",	
				}
    }
	},
  methods:{
		regist(){
			 this.$router.push({path:"/regist"})
		},
		login(){
			 console.log(this.uname,"----",this.code)
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
		optiondetail(){
			this.$router.push({path:"optiondetail"})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.top{
			position: relative;
			height: 45px;
			text-align: center;
			line-height: 45px;
		 .denglu{
			 font-size: 20px;
		 }
	}
	.login-inp{
		 width:80%;
		 margin-top: 100px;
		 .inp{
				width: 100%;
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
				height: 40px;
				font-size:15px;
				box-sizing: border-box;
				display:flex;
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
						box-sizing: border-box;
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
	}
	.login-submit{
		
		width:80%;
		margin-top:20px;
	  .submit{
				 width:100%;
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

</style>
