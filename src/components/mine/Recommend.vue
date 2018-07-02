<template>
  <div>
    <div class="recommendCon">
      <div class="tabConWrapper border-bottom" v-for='(itemCon,index) in recommendCons'>
        <div class="contLeft">
          <p class="type">{{itemCon.name}}</p>
          <p class="date">{{itemCon.date}}</p>
        </div>
        <div class="contRight">+{{itemCon.number}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Recommend',
    data() {
      return {
        recommendCons: [{
            "id": "0001",
            "name": "小明",
            "number": "200",
            "date": "2018-02-12"
          },
          {
            "id": "0002",
            "name": "小花",
            "number": "500",
            "date": "2018-06-12"
          },
          {
            "id": "0003",
            "name": "小李",
            "number": "1200",
            "date": "2018-04-12"
          },
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .recommendCon {
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
</style>