<template>
    <div  >
        <div class="header-top">
             <div class="header-wrapper">
      	        <div class="img-wrapper"  @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
                <div v-if="type ==='robTask'">抢任务</div>
                <div v-if="type==='myTask' && buttonText =='详情'">任务详情</div>
                <div v-if="type==='myTask' && buttonText =='提交'">提交任务</div>
            </div>
            <div class="space"></div>
        </div>
        <div class="taskCont" >
            <div class='title'  >
                <img :src="data.task.iconPath" alt="" class="tackImg left" />
                <div class="left titleCont">
                    <h2>{{data.task.name}}</h2>
                    <p class="orange">{{data.task.rewardNum}}
                        <span v-if="data.task.rewardType=='1'">true</span>
                        <span v-if="data.task.rewardType=='2'">ttr</span>
                        <span v-if="data.task.rewardType=='3'">rmp</span>                                                
                    </p>
                    <p>难度:<i class="orange"> {{data.task.level}}级</i> </p>
                </div> 
          </div>
          <div class="content" >
              <div class="cont-title">任务周期</div>
              <p>{{data.task.startDateTime}}至{{data.task.endDateTime}}</p>
              <div class="cont-title">人数限制</div>
              <p>{{data.task.peopleNum}}人</p>
              <div class="cont-title">任务描述</div>
              <div class="cont-detail">{{data.task.description}}</div>
              <div class="cont-title">提交地址</div>
              <p>{{data.task.pushAddress}}</p>
          </div>
        </div>
        <div class='space'></div> 

    <!-- 抢任务-任务列表过来 -->
        <div class="robTask" v-if=" type ==='robTask' ">
            <div class="cont-title">报名情况</div>
            <!-- 任务个人 -->
            <div  v-for='item of data.taskDetailList' v-if="data.task.category=='0'">
                <div class="taskPer">需要{{item.peopleNum}}人，已报<span class="red">{{item.hasPeople}}</span>人</div>  
                              
            </div>
            <!-- 任务-团队 -->
            <div class="robTask-flex" v-for='item of data.taskDetailList' v-if="data.task.category=='1'">
                <div class="one">{{item.station}}</div>
                <div class="two">（需要{{item.peopleNum}}人，已报<span class="red">{{item.hasPeople}}</span>人）</div>
                <div class="three">{{item.rewardNum}}
                    <span v-if="data.task.rewardType=='1'">true</span>
                    <span v-if="data.task.rewardType=='2'">ttr</span>
                    <span v-if="data.task.rewardType=='3'">rmp</span> 
                </div>
                <div class="five"  @click="holdTask(item)" >抢任务</div> 
                <div class="four" v-if="item.isFull=='1'"  >已满</div> 
                <!-- <div class="four" v-if="!localStorage.token" to="/Login">注册</div>  -->
            </div>
            <div class="bottom" >
                <div class='button one' @click="holdTask"  v-if="data.task.category=='0'">抢任务</div>
                <div class='button two' >推荐转发</div>                
            </div>            
        </div>
        <!-- 已经完成 -->
        <div class="bottom" v-if="type==='myTask' && buttonText =='详情'">
            <div class="cont-title">完成情况</div>
            <p><i>提交地址：</i>{{data.taskCompleteInfo.pushAddress}} </p>
            <p><i>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 明：</i>{{data.taskCompleteInfo.remark}} </p>
            <p><i>审核结果：</i>{{data.taskCompleteInfo.auditResult}}  </p>
            <p><i>奖励收入：</i>{{data.taskCompleteInfo.reward}} </p>          
        </div>
        <!-- 未完成待提交 -->
        <div class="bottom" v-if="type==='myTask' && buttonText =='提交' ">
            <input class="input-top inp" placeholder="提交地址" v-modal="commitAddress"/> 
            <input class="input-bottom inp"  placeholder="说明" v-modal="remark"/>
            <div class='button two'  @click="commit">提交审核</div>                                  
        </div>
        <div class='space'></div>                  
        <div class="tips" v-show="showss">{{tips}}</div>
    </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  export default {
    name: "TaskDetail",
    components: {
      Tabs,
    },
    data() {
      return {
        data:{
            task:{
                // iconPath:'http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png'
            }
        },
        type:'',  // myTask--我的任务页面跳转    robTask-任务列表跳转   
        roleList:[{}],
        buttonText:'', // 详情  提交
        showss:false,
        tips:''  ,
        commitAddress:'',
          remark:'' 
    
      }
    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        getDetail(){
            let id = this.$router.history.current.params.id
            let url = "http://www.phptrain.cn/task/unauth/getTaskInfo?taskId="+id
            var param = {
                    taskId:id
                }
			    this.$http.post(url,param,{
					headers: {
					    'Content-Type': 'application/json'
					}
			 }).then((res)=>{
					if(res.data.message==="成功"){
						if(res.data.result){
                            this.data= res.data.result
                        }
					}else{
						  
					}
			 })	

        },
        getUserTaskInfo(){
             let id = this.$router.history.current.params.id
             console.log(id)
             let url = "http://www.phptrain.cn/task/getUserTaskInfo?taskId="+id
				var param = {
                    taskId:id
                }
			    this.$http.post(url,param,{
					headers: {                      
					    'Content-Type': 'application/json'
					}
			 }).then((res)=>{
					if(res.data.message==="成功"){
                        if(res.data.result){
                            this.data = res.data.result
                        }					
					}else{
						this.tips = res.data.message
					    this.showTips()   
					}
			 })
        },
        showTips(callback){
			this.showss= true;
			var _this = this;
            setTimeout(function(){
                _this.showss = false
                if(callback){
                    callback()
                }},1000)
		},
        holdTask(item){
            if(!localStorage.token){
                this.tips ="您尚未登录，请先登录"
				this.showTips()
                this.$router.push({path:"Login"})
				return 
            } 
            if(item && item.isLevelEnough ==='0'){
                this.tips ="您的开发评级为："+item.userleve+"，请选择符合您开发等级的任务"
				this.showTips()
				return
            }
            let id = this.$router.history.current.params.id
            if(item.id){
                id = item.id
                
            }
            let url = "http://www.phptrain.cn/task/holdTask?taskDetailId="+id
            var param = {
                taskDetailId:id
            }
            this.$http.post(url,param,{
                headers: {
                    'Token':'',
                    'Agent':'',
                    'Content-Type': 'application/json'
                }
                }).then((res)=>{
                if(res.data.message==="成功"){
                    this.tips ="恭喜你！抢到任务 "
                    this.showTips()
                    var _this=this
                    setTimeout(function(){
                        _this.$router.push({path:"Task"})    
                       },2000)
                    return 
                    
                }else{
                    this.tips = res.data.message
					this.showTips()   
                }
            })	
        },
        commit(){
            let id = this.$router.history.current.params.id
             let url = "http://www.phptrain.cn/task/commitUserTask?taskId="+id
				var param = {
                    taskId:id,
                    commitAddress:this.commitAddress,
                    remark:this.remark
                }
			    this.$http.post(url,param,{
					headers: {                      
					    'Content-Type': 'application/json'
					}
			 }).then((res)=>{
					if(res.data.message==="成功"){
                        
                        this.tips = '提交成功'
                        this.showTips() 
                        var _this=this
                        setTimeout(function(){
                            _this.$router.push({path:"Task"})    
                        },1500)
                    				
					}else{
						this.tips = res.data.message
					    this.showTips()   
					}
			 })
        }
             	
        
    },
    mounted() {
        this.type = this.$router.history.current.params.type 
        this.buttonText = this.$router.history.current.params.buttonText
        if(this.type=='robTask') {
            this.getDetail()            
        } else {
            this.getUserTaskInfo()            
        }
    }

  }
</script>

<style scoped lang="less">
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
    margin-top: -120px;
    border-radius: 5px;
}
.space {
    background: #eee;
    height: 10px;
}
.left {
    float: left;
}
.right {
    float: right;
}
.cont-title {
    width: 60px;
    height: 14px;
    line-height: 14px;
    padding-left: 5px;
    margin-top: 20px;
    font-size: 14px;
    color: #00AAEE;
    border-left: #00AAEE solid 2px;
}
.orange {
    font-size: 15px;
    color: #FFAE0F;
}
.red {
        color:#EF5A50;
}
.header-top{
   height: 50px;
   line-height: 50px;
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
.taskCont {
    padding: 15px;
    padding-bottom: 25px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    .title {
        padding-bottom: 15px;
        border-bottom: #E0E4E5 solid 1px;
        .tackImg {
            width: 100px;
            height: 100px;
            vertical-align: top;
        }
        .titleCont {
            margin-left: 20px;
            padding-top: 10px;
        }
        
        p{
            color:#A1ACB4;
            font-size: 15px;            
            margin-top: 10px
        }
        .orange {
            font-size: 15px;
            color: #FFAE0F;
        }
        overflow: hidden;
    }
   
    .content {
        p {
            margin: 15px 0 25px 0;
         }
       
        .cont-detail {
            font-size: 14px;
            margin-top: 15px;
        }
    }
    
  }
.bottom {
    font-size: 14px;
    color: #2E353B;
    padding: 15px;
    p {     
        margin-top: 20px;
        i {
            color: #A1ACB4;
        }
        .orange {
            font-size: 15px;
            color: #FFAE0F;
        }
    }
   
    .button {
        width:100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        border-radius: 4px;
        margin-top: 15px;
    }
    .one {
        background-color: #FFAE0F;
        color: #fff;
    }
    .two {
        background-color: #00AAEE;
        color: #fff;           
    }
    .three {
        border: #00AAEE 1px solid;
        color: #00AAEE;   
    }
    .four {
        background-color:#e6e0e0;
    }
    input {
        width: 100%;
        // display: block;
    }
    .input-top {
        height: 40px;
    }
    .input-bottom {
        height: 125px;
    }
    .inp{
        font-size:15px;
        background-color: #FAFAFA;
        border:1px solid #E7E7E7;
        border-radius: 5px;
        margin-top:20px;
        padding-left: 10px;
        box-sizing: border-box;
    }
}
.robTask {
   padding: 13px;
   .taskPer{
        font-size: 13px;
        margin-top: 10px;
        display: flex;
        height: 40px;
        border-bottom: 1px solid #E0E4E5;
   }
   .robTask-flex {
        font-size: 13px;
        margin-top: 23px;
        display: flex;
        height: 40px;
        border-bottom: 1px solid #E0E4E5;
        .one {
            flex: 3;
            padding-top: 5px;
        }
        .two {
            // flex: ;
            padding-top: 5px;
            color: #A1ACB4
        }
        .three {
            flex: 2;
            margin-left: 20px;
            text-align: center;
            padding-top: 5px;
            color:#FFAE0F;
            font-size: 14px
        }
        .four {
            flex: 2;
            margin-left: 20px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            background-color: #e6e0e0;
            color:#A1ACB4;
            border-radius: 5px;
        }
        .five {
            flex: 2;
            margin-left: 20px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            background-color: #FFAE0F;
            color: #E0E4E5;
            border-radius: 5px;
        }
   }
}

  
</style>