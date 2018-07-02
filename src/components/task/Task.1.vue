<template>
  <div>
    <tabs></tabs>
    <div class="space"></div>
    <ul class="navBar">
      <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :class="{active:active==index}">
        {{item.name}}
      </li>
    </ul>
    <div class="space"></div>
    
    <div class="list border-bottom" ref="wrapper">
      <div>
        <div class="item  border-bottom" v-for="(item,index) of TaskList[tabIndex]" >
          <div class="left">
            <img :src="item.imgUrl" alt="" class="tackImg" />
            <div class="task-rank">
              <p class="name">{{item.name}}</p>
              <p class="rank">难度：<span>{{item.rank}}</span></p>
            </div>
          </div>
          <div class="center">{{item.status}}</div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  export default {
    name: "Task",
    components: {
      Tabs,
    },
    data() {
     
      var taskLists= [
        {
      "id": "0001",
      "name": "任务1",
      "rank": "A级",
      "status": "进行中",
      "type": "个人",
      "imgUrl": "http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png"
    },
    {
      "id": "0002",
      "rank": "B级",
      "name": "任务2",
      "status": "进行中",
      "type": "个人",
      "imgUrl": "http://oz3tayfme.bkt.clouddn.com/show.liluo.cc/2018011022292984819.png"
    },
    {
      "id": "0003",
      "rank": "C级",
      "name": "任务3",
      "status": "已完成",
      "type": "团队",
      "imgUrl": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
    },
     {
      "id": "0002",
      "rank": "B级",
      "name": "任务2",
      "status": "进行中",
      "type": "个人",
      "imgUrl": "http://oz3tayfme.bkt.clouddn.com/show.liluo.cc/2018011022292984819.png"
    },
    {
      "id": "0003",
      "rank": "C级",
      "name": "任务3",
      "status": "已完成",
      "type": "团队",
      "imgUrl": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg"
    }
      ];
   //所有任务 
   var allTask = [];
   //进行中
   var tasking = [];
   //已完成
   var finishTask = [];
  
 
   //把所有不同状态的通过if判断push到相对应的任务状态集合中。
   taskLists.forEach(function(task){
    if(task.status == '已完成'||task.status == '进行中'){
     allTask.push(task);
    };
    if(task.status == '进行中'){
     tasking.push(task);
    };
    if(task.status == '已完成'){
     finishTask.push(task);
    };
   });
   //设置一个空数组，把所有状态下的任务集合放到空数组中，从0-5的顺序按照你的自己设置的tab切换的内容0-5的顺序对应排列，
   var taskAll = [ allTask, tasking, finishTask];
   console.log(taskAll)
      return {
        active: 0,
        num: 0,
        tabIndex : 0,
        navs: [{
            id: '1',
            name: '所有任务(3)',
          },
          {
            id: '2',
            name: '进行中任务(4)',
          },
          {
            id: '3',
            name: '已完成任务(7)',
          }
        ],
        
        TaskList: taskAll
    
      }
    },
    methods: {
      tabs(index) {
        this.num = index
        this.active = index
        this.tabIndex=index
      },
      // getAllTask(){
      //   axios.get('/static/mock/status.json')
      //   .then(this.getAllTaskSucc)
      // },
      // getAllTaskSucc(res){
      //     this.TaskList=res.data.allTask
      //      console.log(this.TaskList+222222222222)
      // }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper)
      //this.getAllTask()
    }

  }
</script>

<style scoped lang="less">
 .space {
    background: #eee;
    height: 10px;
  }
  
.list{
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

  
  .navBar {
    height: 50px;
    line-height: 50px;
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
</style>