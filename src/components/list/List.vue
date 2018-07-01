<template>
	<div>
		<list-header @change="hanleSelectTack" :taskList="taskList"></list-header>
		<div class="list border-bottom" ref="wrapper">
			<div >
				<div class="item  border-bottom" v-for="item of tempTaskList">
			          <div class="left">
			              <img :src="item.imgUrl" alt=""  class="tackImg"/>
			              <div class="task-rank">
			                 <p class="name">{{item.name}}</p>
			                 <p class="rank">难度：<span>{{item.rank}}</span></p>
			              </div>
			          </div>
			          <div class="center">{{item.number}}True</div>
			          <div class="right">抢任务</div>
	      		</div>
			</div>
      
 </div>
		<tabs></tabs>
	</div>
</template>
<script>
  import axios from 'axios'
  import Bscroll from 'better-scroll'
  import ListHeader from './Header'
  import Tabs from '../tab/Tab'
	export default{
		name:'List',
		components:{
			ListHeader,
			Tabs
		},
		data () {
		    return {
		      taskType:'',
		      taskList:[],//原始列表
		      tempTaskList:[]//临时列表
		    }
  		},
  		
		methods:{
		  getTaskInfo(){
		    axios.get('/static/mock/task.json')
		    .then(this.handleInfoSucc)
		  },
		  handleInfoSucc(res){
				console.log(res)
		    res=res.data
				console.log(res)
		    if(res.ret && res.data){
		     const data=res.data
		     this.taskList=data.taskList
			 this.tempTaskList=data.taskList
		    }
		  },
		  hanleSelectTack(type){
		  	console.log(type)
		    this.taskType=type
		    let result=[]
	        for(let i=0;i<this.taskList.length;i++){
	          if(this.taskList[i].type==this.taskType||this.taskList[i].rank==this.taskType){
	            result.push(this.tempTaskList[i])
	          }
	        }
	        this.tempTaskList=result
	        if(type==='不限'){
	        	this.tempTaskList=this.taskList
	        }
	        if(type==='奖励降序'){
	        	this.tempTaskList=this.taskList.sort(function(a,b){
	        		return a.number-b.number
	        	})
	        }
	        if(type==='奖励升序'){
	        	this.tempTaskList=this.taskList.sort(function(a,b){
	        		return b.number-a.number
	        	})
	        }
		  }
		},
		mounted(){
		  this.getTaskInfo()
		  this.scroll=new Bscroll(this.$refs.wrapper)
		}
	}
</script>

<style lang="less" scoped>
  .list {
  	position: absolute;
  	top: 50px;
  	left: 0;
  	right: 0;
  	bottom: 60px;
  	overflow: hidden;
  	.item {
  		display: flex;
  		justify-content: left;
  		align-items: center;
  		padding: 10px 15px;
  		.left {
  			.task-rank {
  				display: inline-block;
  				margin-left: 10px;
  				max-width: 140px;
  				.name {
  					font-size: 17px;
  					color: #2E353B;
  				}
  				.rank {
  					font-size: 13px;
  					color: #A1ACB4;
  				}
  			}
  			.tackImg {
  				width: 50px;
  				height: 50px;
  				vertical-align: top;
  			}
  		}
  		.center {
  			flex: 1;
  			color: #FC8936;
  			font-size: 13px;
  			margin-left: 10px;
  		}
  		.right {
  			padding: 9px 12px;
  			background: #FFAE0F;
  			color: #fff;
  			font-size: 13px;
  			border-radius: 5px;
  		}
  	}
  }
</style>