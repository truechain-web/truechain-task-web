<template>
  <div>
    <footer class="footer border-top">
      <div class="item">
        <router-link to="/List">
          <div class="">
            <span class="iconfont">&#xe76a;</span>
            <p class="name">任务列表</p>
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/Task">
          <div>
            <span class="iconfont">&#xe63f;</span>
            <p class="name">我的任务</p>
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/Mine">
          <div>
            <span class="iconfont">&#xe614;</span>
            <p class="name">个人中心</p>
          </div>
        </router-link>
      </div>
    </footer>
  </div>

</template>

<script>
  export default {
    name: 'Tabs'
  }
</script>

<style lang="less" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 99;
    background: #fff;
    .item {
      float: left;
      width: 33.3333%;
      text-align: center;
      padding-top: 10px;
      .active {
        .name,
        .iconfont {
          color: #02ABEE;
        }
      }
      .name {
        color: #A3A5A8;
        font-size: 12px;
      }
      .iconfont {
        color: #A3A5A8;
        font-size: 22px;
      }
    }
  }
</style>