<template>
		<div class="detail">
				<div class="top">
						<span class="return" @click="goback"> &lt; </span>
						<span class="zhuce">使用说明</span>
				</div>
				<div class="content">
						<p>尊敬的用户，您好！</p>
						<p>恭喜您成文XXX用胡，本网站有XX运营，恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营</p>
					
						<p>恭喜您成文XXX用胡，本网站有XX运营，恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营</p>
						<p>恭喜您成文XXX用胡，本网站有XX运营，恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营</p>
						<p>恭喜您成文XXX用胡，本网站有XX运营，恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营恭喜您成文XXX用胡，本网站有XX运营</p>
							
				</div>
		</div>
</template>
<script>
export default {
	 data(){
		 return {
			  
		 }
	 },
	 methods:{
		  goback(){
				 this.$router.go(-1)
			}
	 }
}	
</script>
<style scoped lang="less">
 .detail{
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
	.content{
		text-align: left;
		p{
			margin-top:20px;
			padding-left:10px;
			box-sizing: border-box;
			font-family: "PingFang-SC-Medium";
			font-size:13px;
			line-height: 20px;
			color:#2E353B;
		}
	}
 }
</style>

