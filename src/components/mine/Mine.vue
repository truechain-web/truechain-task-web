<template>
  <div>
    <div class="space"></div>
    
    <div class="header">
      <div class="left">
        <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="" class="userImg" />
        <div class="userRank">
          <p class="name" v-text="wxNickName"></p>
          <p class="rank">等级：<span>{{level}}</span></p>
        </div>
      </div>
      <router-link to="recommend">
        <div class="right">
          <p class="name">{{recommendPeople}}<span class="unit">个</span></p>
          <p class="info">推荐成功人数</p>
        </div>
      </router-link>
    </div>
    <div class="space"></div>
    <ul class="navBar">
      <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :class="{active:active==index}">
        <span class="num" v-text="item.num"><span class="unit">个</span></span>
        <p class="name">{{item.name}}</p>
      </li>
    </ul>
  

    <div class="tabCon" ref="wrapper">
      
      <div >
         <div class="space"></div>
      	  <div class="tabConWrapper border-bottom" v-for='(itemCon,index) in tabContents[tabIndex]' >
        <div class="contLeft">
          <p class="type">{{itemCon.rewardResource}}收入</p>
          <p class="date">{{itemCon.createTime}}</p>
        </div>
        <div class="contRight">+{{itemCon.reward}}</div>
      </div>
      </div>
     
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  import Bscroll from 'better-scroll'
  
  export default {
    name: "Mine",
    components: {
      Tabs,
    },
    data() {
      return {
        taskType: '',
        tabContents: [],
        tempContents: [],
        active: 0,
        tabIndex:0,
        rewardType:1,
        recommendPeople:0,
        wxNickName:'',
        level:'',
        rewardResource:'',
        navs: [{
            id: '1',
            num: '',
            name: 'true奖励总数',
            type: 'true奖励'
          },
          {
            id: '2',
            num: '',
            name: 'ttr奖励总数',
            type: 'ttr奖励'
          },
          {
            id: '3',
            num: '',
            name: '红包奖励总数',
            type: '红包奖励'
          }
        ],
        tabContents: []
      }

    },
    methods: {
      tabs(index) {
        this.tabIndex = index
        this.active = index
      }, 
      getIncomeInfo() {
        let url = 'http://www.phptrain.cn/user/getUserInfo?rewardType=1'
        this.$http.get(url).then((res)=>{
           const result=res.data.result
           this.level=result.user.level
           this.recommendPeople=result.recommendPeople
           this.wxNickName=result.user.wxNickName
           this.navs[1].num=result.userAccount.ttrReward
           this.navs[2].num=result.userAccount.gitReward
           this.navs[0].num=result.userAccount.trueReward
           console.log(res)
           if(res.data.code&&res.data){
              const data=res.data.result
              var trueList=[]
              var ttrList=[]
              var bagList=[]
              const dataList= data.userAccount.accountDetails
             dataList.forEach(function(list){
              if(list.rewardType===1){
                trueList.push(list)
              }
             if(list.rewardType===2){
                ttrList.push(list)
              }
              if(list.rewardType===3){
                bagList.push(list)
              }
              if(list.rewardResource===1){
              	list.rewardResource='任务'
              }
              if(list.rewardResource===2){
              	list.rewardResource='推荐'
              }
              })
                
            var allIncomeList=[trueList,ttrList,bagList]
          	  this.tabContents=allIncomeList
           }
        }).catch((err)=>{
          console.log(err)
        })
      },
      handleChange(incomeType) {
        this.taskType = incomeType
        let result = []
        for(let i = 0; i < this.tabContents.length; i++) {
          console.log(this.tabContents[i].type)
          if(this.tabContents[i].type == this.taskType) {
            result.push(this.tempContents[i])
          }
        }
        this.tempContents = result
      }
    },
    
 
    mounted() {
      this.getIncomeInfo()
      this.scroll = new Bscroll(this.$refs.wrapper)
    }


  }
</script>

<style scoped lang="less">
  .space {
    background: #eee;
    height: 10px;
  }
  
  .tabCon {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60px;
    top: 184px;
    overflow: hidden;
    .tabConWrapper {
      display: flex;
      padding: 0 15px;
      height: 60px;
      
      align-items: center;
      .contLeft {
        flex: 1;
        .type {
          font-size: 15px;
          color: #2E353B;
        }
        .date {
          color: #A1ACB4;
          font-size: 12px;
          padding-top: 8px;
        }
      }
      .contRight {
        color: #2E353B;
        font-size: 14px;
      }
    }
  }
  
  .space {
    background: #eee;
    height: 10px;
  }
  
  .header {
    display: flex;
    padding: 12px 18px 12px 14px;
    align-items: center;
    .left {
      flex: 1;
      .userImg {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        vertical-align: bottom;
      }
      .userRank {
        margin-left: 11px;
        display: inline-block;
        .name {
          color: #2E353B;
          font-size: 18px;
          margin-top: -55px;
        }
        .rank {
          color: #A1ACB4;
          font-size: 14px;
          margin-top: 4px;
          span {
            color: #FC8936;
            border: 2px solid #FC8936;
            padding: 2px;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            display: inline-block;
            text-align: center;
            line-height: 12px;
          }
        }
      }
    }
    .right {
      .name {
        color: #02ABEE;
        font-size: 18px;
        .unit {
          font-size: 12px;
        }
      }
      .info {
        color: #A1ACB4;
        font-size: 12px;
      }
    }
  }
  
  .navBar {
    height: 76px;
    display: flex;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    background: #fff;
    .item {
      flex: 1;
      .num {
        color: #2E353B;
        font-size: 18px;
        padding-top: 20px;
        display: inline-block;
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
        bottom: 0;
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