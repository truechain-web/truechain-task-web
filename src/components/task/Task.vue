<template>
  <div>
    <!-- <div class="header-top">
      <div class="header-wrapper">
      	<div class="img-wrapper"  @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
       <div>我的任务</div>
      </div>
      <div class="space"></div>
    </div> -->
    <div>
        <ul class="navBar">
          <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :class="{active:active==index}">
            {{item.name}}({{item.num}})
          </li>
        </ul>
         <div class="space space_"></div>
    </div>
  
  
    
    <div class="list border-bottom" ref="wrapper">
      
       <div>
        <div class="item  border-bottom" v-for="(item,index) of TaskList" :key="index" >
          <div class="left">
           <img src="../../assets/img/task-logo.png" alt="" class="tackImg" />
            <div class="task-rank">
              <p class="name">{{item.name}}</p>
              <p class="rank">难度：<span>{{item.level}}</span></p>
            </div>
          </div>
          <div class="center">{{item.taskStatus}}</div>
          <div class="right" @click="buttonClick(item)" >{{item.buttonText}}</div>
        </div>
      </div>
      <div class="loading-container" v-show="hasCode">
        <loading></loading>
      </div>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  import Loading from '../../base/loading/Loading'
  export default {
    name: "Task",
    components: {
      Tabs,
      Loading
    },
    data() {
      return {
        active: 0,
        hasCode:true,
        taskStatus:'',
        buttonText:'',
        navs: [{
            id: '1',
            name: '所有任务',
            num:0
          },
          {
            id: '2',
            name: '进行中任务',
            num:0
          },
          {
            id: '3',
            name: '已完成任务',
            num:0
          }
        ],
         TaskList: []
      }
    },
    methods: {
      goback(){
         this.$router.go(-1)
      },
      buttonClick(item){
        this.$router.push({name:"TaskDetail",params:{id:item.id,buttonText:item.buttonText,type:'myTask'}})
      },
      tabs(index) {
      console.log(index,"-----")
        let url = "http://www.phptrain.cn/api/task/getUserTaskList"
        var param = new FormData()
        var token=JSON.parse(localStorage.getItem("token"))
        console.log(index)
    	if(index===1){
  			status=0
  		}
      	else if(index===2){
      		status=1
      	}
      	else{
        	status=2
        	this.getAllTask()
        }
      	if(status!==2){
          param.append("taskStatus",status)
        }
      	this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json',
             'Agent': token.agent,
            'Token': token.token
          }
        }).then((res)=>{
             if(res.data.code&&res.data){
        	   const data=res.data.result
          	 const dataList=data.taskList
          	 dataList.forEach(function(list){
          	 console.log(list.taskStatus)
							if(list.taskStatus === 0) {
								list.taskStatus = '进行中'
								list.buttonText='提交'
							}
							if(list.taskStatus === 1) {
								list.taskStatus = '已完成'
							  list.buttonText='详情'
								
							}
						})
          	 this.TaskList=dataList
          	}
        })
        this.active = index
      },
      getAllTask(){
   
        var token=JSON.parse(localStorage.getItem("token"))
        let url = "http://www.phptrain.cn/api/task/getUserTaskList"
        this.$http.post(url,{
          headers: {
            'Content-Type': 'application/json',
            'Agent': token.agent,
            'Token': token.token
          }
        }).then((res)=>{
           var _this = this;
          if(res.data.code&&res.data){
            if(res.data.code){
              this.hasCode=false
            }
          	const data=res.data.result
          	const dataList=data.taskList
          	
						dataList.forEach(function(list){
							if(list.taskStatus === 0) {
								list.taskStatus = '进行中'
								list.buttonText='提交'
								
							}
							else{
								list.taskStatus = '已完成'
								list.buttonText='详情'
							}
						})
           this.TaskList=dataList
           this.navs[0].num=data.taskTotal
           this.navs[1].num=data.taskingTotal
           this.navs[2].num=data.taskComplateTolal
           this.$nextTick(()=>{
                this._initScroll();
              })
            }
        })
      },
    
      _initScroll(){
        this.scroll = new Bscroll(this.$refs.wrapper)
      }
    },
    created() {
      setTimeout(()=>{
           this.getAllTask()
      },1000)
      
    },
    watch:{
       TaskList(a){
         this.taskList = a;
       }
    }

  }
</script>

<style scoped lang="less">
 .space {
    background: #eee;
    height: 10px;
  }
 .header-top{
   height: 50px;
   line-height: 50px;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   .header-wrapper{
     text-align: center;
     .img-wrapper{
       position: absolute;
       width: 30px;
       left: 0;
       right: 0;
       img{
         width: 24px;
       }
     }
   }
 }
.list{
   overflow: hidden;
   position: absolute;
   top: 60px;
    left: 0;
    right: 0;
    bottom: 60px;
    .item {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px 15px;
    .left {
      flex: 2;
      .task-rank {
        display: inline-block;
        margin-left: 10px;
        max-width: 140px;
        .name {
          font-size: 17px;
          color: #2E353B;
          margin-top: 6px;
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
        border: 1px solid #eee;
      }
    }
    .center {
      flex: 1;
      color: #FC8936;
      font-size: 13px;
      margin-left: 10px;
    }
    .right {
      padding: 7px 12px;
      background: #FFAE0F;
      color: #fff;
      font-size: 12px;
      border-radius: 5px;
    }
  }
}

  .space_{
     position: fixed;
    top:50px;
    left: 0;
    right: 0;
  }
  .navBar {
    position: fixed;
    // top:60px;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    z-index: 99;
    background: #fff;
    display: flex;
    text-align: center;
    .item {
      flex: 1;
      font-size: 15px;
      .num {
        color: #2E353B;
        font-size: 18px;
        .unit {
          font-size: 12px;
        }
      }
      &.active {
        .num {
          color: #02ABEE;
        }
      }
      &.active:after {
        content: '';
        border-bottom: 2px solid #02ABEE;
        width: 100%;
        height: 2px;
        position: absolute;
        bottom:0;
        left: 0;
      }
      .name {
        color: #A1ACB4;
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>