<template>
  <div>
    <div class="space"></div>
    <list-header @change="hanleSelectTack" :taskList="taskList"></list-header>

    <div class="list border-bottom" ref="wrapper">

      <div>
        <div class="space"></div>
        <div class="item  border-bottom" v-for="item of tempTaskList">

          <div class="left">
            <img :src="item.imgUrl" alt="" class="tackImg" />
            <div class="task-rank">
              <p class="name">{{item.name}}</p>
              <p class="rank">难度：<span>{{item.level}}</span></p>
            </div>
          </div>
          <div class="center">{{item.rewardNum}}True</div>
          <router-link to="taskDetail">
            <div class="right"  >抢任务</div>
          </router-link>
        </div>
        <div class="no-data" v-if="!tempTaskList.length">没有找到符合条件的任务</div>
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
  export default {
    name: 'List',
    components: {
      ListHeader,
      Tabs
    },
    data() {
      return {
        taskType: '',
        taskList: [], //原始列表
        tempTaskList: [], //临时列表
        pageIndex:1,
        pageSize:10,
      }
    },

    methods: {
      getTaskInfo() {
        let url = "http://www.phptrain.cn/task/unauth/getTaskPage"
				var param = new FormData()
				param.append("pageIndex",this.pageIndex)
				param.append("pageSize",this.pageSize)
        this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          if(res.data.code&&res.data){
            const data=res.data.result
            this.taskList=data.content
            this.tempTaskList=data.content
          }
          
        })
      },
      hanleSelectTack(type) {
        let grade = '';
        var category=2; //默认不限
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
        else{
          grade = '';
          category=2;
        }
        // 发送请求
        let url =  "http://www.phptrain.cn/task/unauth/getTaskPage"
        var param = new FormData()
        param.append("pageIndex",this.pageIndex)
        param.append("pageSize",this.pageSize)
        if(category!==2){
          param.append("category",category)
        }
        if(grade!==""){
          param.append("level",grade)
        }
        this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          const data=res.data.result
          if(data.content.length==0){
            this.tempTaskList.length=0
          }
          this.taskList=data.content
          this.tempTaskList=data.content
        })
        
      }
     },
    mounted() {
      this.getTaskInfo()
      this.scroll = new Bscroll(this.$refs.wrapper)
    }
  }
</script>

<style lang="less" scoped>
  .space {
    background: #eee;
    height: 10px;
  }
  .no-data{
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
  }
  .list {
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
        padding: 7px 12px;
        background: #FFAE0F;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
</style>