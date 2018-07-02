<template>
  <div>
    <div class="space"></div>
    
    <div class="header">
      <div class="left">
        <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="" class="userImg" />
        <div class="userRank">
          <p class="name">盖尔.加朵</p>
          <p class="rank">等级：<span>B</span></p>
        </div>
      </div>
      <router-link to="recommend">
        <div class="right">
          <p class="name">3<span class="unit">个</span></p>
          <p class="info">推荐成功人数</p>
        </div>
      </router-link>
    </div>
    <div class="space"></div>
    <ul class="navBar">
      <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :class="{active:active==index}">
        <span class="num">{{item.num}}<span class="unit">个</span></span>
        <p class="name">{{item.name}}</p>
      </li>
    </ul>
  

    <div class="tabCon" ref="wrapper">
      
      <div >
         <div class="space"></div>
      	  <div class="tabConWrapper border-bottom" v-for='(itemCon,index) in tabContents[tabIndex]' >
        <div class="contLeft">
          <p class="type">{{itemCon.type}}</p>
          <p class="date">{{itemCon.date}}</p>
        </div>
        <div class="contRight">+{{itemCon.number}}</div>
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

    methods: {
      tabs(index) {
        this.tabIndex = index
        this.active = index
      },
      getIncomeInfo() {
        axios.get('/static/mock/mine.json')
          .then(this.getInfoSucc)
      },
      getInfoSucc(res) {
        res = res.data
        if(res.ret && res.data) {
          const data = res.data
          var trueList=[]
          var ttrList=[]
          var bagList=[]
          data.incomeList.forEach(function(list){
            if(list.type=='true奖励'){
              trueList.push(list)
            }
            if(list.type=='ttr奖励'){
              ttrList.push(list)
            }
            if(list.type=='红包奖励'){
              bagList.push(list)
            }
          })
          var allIncomeList=[trueList,ttrList,bagList]
          this.tabContents=allIncomeList
        }

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
    data() {
      return {
        taskType: '',
        tabContents: [],
        tempContents: [],
        active: 0,
        tabIndex:0,
        navs: [{
            id: '1',
            num: '1200',
            name: 'true奖励总数',
            type: 'true奖励'
          },
          {
            id: '2',
            num: '200',
            name: 'ttr奖励总数',
            type: 'ttr奖励'
          },
          {
            id: '3',
            num: '600',
            name: '红包奖励总数',
            type: '红包奖励'
          }
        ],
        tabContents: []
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