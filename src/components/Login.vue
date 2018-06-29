<template>
  <div class="login">
		  <img src="../assets/logo.png">
		  <div class="login-inp">
				<div><span>姓名</span><input type="text" v-model="uname" /></div>
				<div><span>密码</span><input type="password" v-model="upassword" /></div>
			</div>
			<div class="login-submit">
				 <input type="button" value="注册" @click="regist"/>
				 <input type="button" value="登录" @click="login"/>
			</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
			 uname:"",
			 upassword:""
    }
	},
  methods:{
		regist(){
			 this.$router.push({path:"/regist"})
		},
		login(){
			 
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
	.login-inp{
		 width:90%;
		 
		 div{
			  height: 100px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				span{
								border-bottom: 10px;
						}
				input{
					width:100%;
					height: 40px;
					border:1px solid #E7E7E7;
					border-radius: 5px;
					background-color: #FAFAFA;
					color:#A1ACB4;
					font-size:20px;
					text-align: center;
				}
		 }	 
	}
	.login-submit{
		display: flex;
		justify-content: space-between;
		width:90%;
		margin-top:20px;
		input{
			width:40%;
			background-color: #FAFAFA;
			border:1px solid lightblue;
			border-radius: 5px;
			height: 50px;
		}
	}
}

</style>
