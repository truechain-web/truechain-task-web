<template>
  <div>
     <!-- <div class="header-top">
      <div class="header-wrapper">
        <div class="img-wrapper"  @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
       <div>任务列表</div>
      </div>
      <div class="space"></div>
    </div> -->
    <list-header @change="hanleSelectTack"  @fetch="handleFetch"></list-header>
      <scroll class="wrapper" ref="wrapper"
          :data="tempTaskList"  :totalSize="totalPages" :pageIndex="pageIndex"  :last="Islast"
          :pulldown="pulldown" :pullup="pullup" 
          @pulldown="getTaskInfo" @scrollToEnd="loadMore"> 
          <div class="list" >
              <div class="item  border-bottom" v-for="item of tempTaskList">
                <div class="left">
                  <img :src="item.iconPath" alt="" class="tackImg" />
                  <div class="task-rank">
                    <p class="name">{{item.name}}</p>
                    <p class="rank">难度：<span>{{item.level}}级</span></p>
                  </div>
                </div>
                <div class="center">{{item.rewardNum}}True</div>
                <div class="right"  @click="buttonClick(item.id)" >抢任务</div>
              </div>
             
          </div>
           <div class="no-data" v-show="hasData">没有找到符合条件的任务</div>
           <div style="height: 50px;" ></div>
          
            
     </scroll>
     <div class="loading-container" v-show="hasCode">
              <loading></loading>
            </div>
    <tabs></tabs>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
  import ListHeader from './Header'
  import Tabs from '../tab/Tab'
  import Scroll from '../scroll/Scroll'
  import Loading from '../../base/loading/Loading'
  export default {
    name: 'List',
    components: {
      ListHeader,
      Tabs,
      Loading,Scroll
    },
    data() {
      return {
        taskType: '',
        taskList: [], //原始列表
        tempTaskList: [], //临时列表
        pageIndex:1,
        pageSize:20,
        hasData:false,
        hasCode:true,
        pulldown: true,
        pullup:true,
        totalPages:1,
        Islast:''
      }
    },
    computed:{
        arr1:function(){
            return this.arr.sort(sortNum)//调用排序方法
        }
    },
    methods: {
      goback(){
         this.$router.go(-1)
      },
      getTaskInfo() {
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
				var param = new FormData()
				this.pageIndex=1
				param.append("pageIndex",this.pageIndex)
				param.append("pageSize",50)
        this.$http.post(url,param).then((res)=>{
          if(res.data.code&&res.data){
            if(res.data.code){
              this.hasCode=false
            }
             const data=res.data.result
            this.taskList=data.content
            this.tempTaskList=data.content
            this.totalPages=data.totalPages
            if(this.pageIndex==this.totalPages&& data.last){
               this.pullup=false
               this.$nextTick(() => {
                  this.hasCode = false;
                })
            }
           
          }
        })
      },
      loadMore(){
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        if(this.pageIndex<this.totalPages){
          this.pageIndex++
        }
        else{
          this.pageIndex=this.totalPages
        }
        
//this.pageIndex++

        var param = new FormData()
        param.append("pageIndex",this.pageIndex)
        param.append("pageSize",this.pageSize)
       if(this.pullup){
//     	console.log('还有数据要加载')
       	  this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
            const data=res.data.result
            var result=data.content
            this.tempTaskList=this.tempTaskList.concat(result)
//          console.log( this.pageIndex,this.totalPages,data.last)
             if(this.pageIndex==this.totalPages&& data.last){
               this.pullup=false
               this.$nextTick(() => {
                  this.hasCode = false;
                })
            }
        })
       }
      
      },
      
      handleFetch(){
        this.hasData=false
        this.getTaskInfo()
      },
      buttonClick (id){
        this.$router.push({name:"TaskDetail",params:{id:id,type:'robTask'}})
      },
      hanleSelectTack(type,sort) {
        let grade = '';
        var category=2; //默认不限
        var reward=2 //奖励默认不限
        if(type === "A级"){
           grade = "A"
        }else if (type === "B级"){
          grade = "B"
        }else if (type === "C级"){
          grade = "C"
        }
        else if (type === "个人"){
          category = 0
        }
        else if (type === "团队"){
          category =1
        }
        else if (type === "奖励升序"){
//        reward	 =0
       
        }
        else if (type === "奖励降序"){
//        reward	 =1
           this.tempTaskList = this.taskList.sort(function(a, b) {
           return a.number - b.number
          })
        }
        else{
          grade = '';
          category=2;
           reward	 =2
        }
        
        if(sort==0){
          if(type === "奖励升序"){
             function compareUp(property){
              return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value1 - value2;
              }
            }
            this.tempTaskList=this.taskList.sort(compareUp('rewardNum'))
           console.log(this.tempTaskList,111111)
          }
          else if(type === "奖励降序"){
             function compareDown(property){
              return function(a,b){
                  var value1 = a[property];
                  var value2 = b[property];
                  return value2 - value1;
              }
          }
            this.tempTaskList=this.taskList.sort(compareDown('rewardNum'))
           console.log(this.tempTaskList,2222222)
          }
          else{
            this.getTaskInfo()
          }
        }
        // 发送请求
        let url =  "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        this.pageIndex=1
        param.append("pageIndex",this.pageIndex)
        param.append("pageSize",this.pageSize)
        if(category!==2){
          param.append("category",category)
        }
        if(grade!==""){
          param.append("level",grade)
        }
        if(reward!==2){
          param.append("reward",reward)
        }
        this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          const data=res.data.result
          if(res.data.code&&res.data){
            this.hasData=false
            this.taskList=data.content
            this.tempTaskList=data.content
         		 if(data.last&&this.tempTaskList.length){
               this.pullup=false
               this.$nextTick(() => {
                  this.hasCode = false;
                })
            }
          }
          if(data.content==''){
             this.hasData=true
          }
        })
        
      }
     },
    mounted() {
      setTimeout(()=>{
           this.getTaskInfo()
      },1000)
    },
    created(){
      
    }
  }
</script>

<style lang="less" scoped>
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
  .space {
    background: #eee;
    height: 10px;
  }
  .no-data{
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
  }
  .wrapper {
    position: absolute;
    top: 60px;
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
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>