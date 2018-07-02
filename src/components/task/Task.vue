<template>
  <div>
    <tabs></tabs>
    <ul class="navBar">
      <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :class="{active:active==index}">
        {{item.name}}
      </li>
    </ul>
    <div class="list border-bottom" ref="wrapper">
      <div>
        <div class="item  border-bottom" v-for="(item,index) of TaskList" v-show=" index == num">
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
  export default {
    name: "Task",
    components: {
      Tabs,
    },
    data() {
      return {
        active: 0,
        num: 0,
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
        TaskList: [{
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
        ]
      }
    },
    methods: {
      tabs(index) {
        this.num = index
        this.active = index
      },
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper)
    }

  }
</script>

<style scoped lang="less">
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