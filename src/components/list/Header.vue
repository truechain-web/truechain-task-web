<template>
  <div>
    <div class="header border-bottom">
      <div class="item-wrapper" v-show="show" ref="headerTitle">
        <span class="name  border-right" @click="selectItem(0)">类别</span>
        <span class="name  border-right" @click="selectItem(1)">等级</span>
        <span class="name  border-right" @click="selectItem(2)">奖励</span>
        <span class="search iconfont" @click="searchItem">&#xe741;</span>
      </div>
      <div class="search-wrapper" v-show="!show">
        <span class="search iconfont">&#xe741;</span>
        <input type="text" class="search-input" v-model="keyword" />
        <span @click="cancelSearch" class="cancel">取消</span>
      </div>
      <div class="space"></div>
    </div>
    <div class="search-content" v-show="keyword" ref="wrapper">
      <div>
        <div class="item" v-for="item of list">
          <div class="left">
            <img :src="item.imgUrl" alt="" class="tackImg" />
            <div class="task-rank">
              <p class="name">{{item.name}}</p>
              <p class="rank">难度：<span>{{item.rank}}</span></p>
            </div>
          </div>
          <div class="center">{{item.number}}True</div>
          <div class="right">抢任务</div>

        </div>
        <div class="space"></div>
      </div>

      <div class="search-item" v-show="hasnoData">没有找到匹配数据</div>
    </div>
    <ul class="select-wrapper" v-show="isShow">
      <li class="border-bottom select-item" :class="{ active: active==index }" v-for="(item,index) of itemList" :key="item.id" @click="handleClick(index,item.name)">{{item.name}}</li>
    </ul>
    <div class="mask" v-show="showMask">

    </div>
  </div>

</template>

<script>
  import Bscroll from 'better-scroll'
  export default {
    name: "ListHeader",
    data() {
      return {
        isShow: true,
        show: true,
        itemList: [],
        lastItemIndex: -1,
        keyword: "",
        timer: null,
        list: [],
        active: 0,
        showMask: false,
      };
    },
    props: {
      taskList: Array
    },
    computed: {
      hasnoData() {
        return !this.list.length;
      }
    },
    
    watch: {
      keyword() {
        if(this.timer) {
          clearTimeout(this.timer);
        }
        if(!this.keyword) {
          this.list = [];
        }
        this.timer = setTimeout(() => {
          const result = [];
          console.log(this.taskList)
          for(let i in this.taskList) {
            if(this.taskList[i].name.indexOf(this.keyword) >= 0) {
              result.push(this.taskList[i]);
            }
          }
          this.list = result;
          this.$nextTick(()=>{
              this._initScroll();
            })
        }, 100);
      }
    },
    methods: {
      _initScroll(){
        this.scroll = new Bscroll(this.$refs.wrapper)
      },
      searchItem() {
        this.show = !this.show;
        this.isShow = false;
        this.showMask =false
        this.$emit('fetch')
      },
      cancelSearch(e) {
        this.show = !this.show;
        this.isShow = false;
        this.keyword = ''
      },
      handleClick(index, name) {
        this.active = index
        this.isShow = false;
        this.showMask = false;
        this.isActive = true
        this.lastItemIndex = 4;
        this.$emit("change", name);
      },
      selectItem(res) {
        if(
          this.lastItemIndex == -1 ||
          this.lastItemIndex != res ||
          this.lastItemIndex == 4
        ) {
          this.lastItemIndex = res;
          this.isShow = true;
          this.showMask = true
        } else if(this.lastItemIndex == res) {
          this.isShow = false;
          this.showMask = false
          this.lastItemIndex = -1;
        }

        if(res == 0) {
          this.itemList = [{
              id: "01",
              name: "不限",
            },
            {
              id: "02",
              name: "个人",
            },
            {
              id: "03",
              name: "团队",
            }
          ];
        }
        if(res == 1) {
          this.itemList = [{
              id: "01",
              name: "不限"
            },
            {
              id: "02",
              name: "A级"
            },
            {
              id: "03",
              name: "B级"
            },
            {
              id: "04",
              name: "C级"
            }
          ];
        }
        if(res == 2) {
          this.itemList = [{
              id: "01",
              name: "不限"
            },
            {
              id: "02",
              name: "奖励升序"
            },
            {
              id: "03",
              name: "奖励降序"
            }
          ];
        }
      }
    }
  };
</script>
<style lang="less" scoped>
 .space {
    background: #eee;
    height: 10px;
  }
  .header {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    z-index: 99;
    background: #fff;
    .item-wrapper {
      overflow: hidden;
      .name {
        width: 29%;
        float: left;
        font-size: 14px;
        text-align: center;
      }
      .search {
        float: left;
        text-align: center;
        width: 13%;
      }
    }
    .search-wrapper {
      display: flex;
      border-radius: 20px;
      margin: 4px 10px 4px;
      height: 40px;
      line-height: 40px;
      .search {
        text-align: center;
        width: 40px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #eee;
      }
      .search-input {
        flex: 1;
        background: #eee;
        border-radius: 0;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
      }
      .cancel {
        font-size: 13px;
        padding-left: 7px;
        cursor: pointer;
      }
    }
  }
  
  .select-wrapper {
    background: #fff;
    z-index: 80;
    top: 120px;
    position: absolute;
    left: 0;
    right: 0;
    .select-item {
      height: 43px;
      line-height: 43px;
      padding: 0 0 0 22px;
      font-size: 15px;
      &.active:after {
          content: '';
          display: inline-block;
          border: 2px solid #00AAEE;
          border-top-width: 0;
          border-right-width: 0;
          width: 12px;
          height: 7px;
          -webkit-transform: rotate(-50deg);
          position: absolute;
          top: 15px;
          right: 19px;
      }
    }
  }
  
  .search-content {
    position: absolute;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 60px;
    top: 110px;
    z-index: 1;
    overflow: hidden;
    .space {
      background: #eee;
      height: 10px;
    }
    .search-item {
      font-size: 14px;
      padding: 10px 20px;
    }
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
  
  .mask {
    position: absolute;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
    z-index: 70;
  }
</style>