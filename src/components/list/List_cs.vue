<template>
 <section class="finan">
  <!-- 上拉加载更多 -->
  <load-more
  :bottom-method="loadBottom"
  :bottom-all-loaded="allLoaded"
  :bottomPullText='bottomText'
  :auto-fill="false"
  @bottom-status-change="handleBottomChange"
  ref="loadmore">
    <div>
        <div class="list" >
              <div class="item  border-bottom" v-for="item of tempTaskList">
                <div class="left">
                  <img src="../../assets/img/task-logo.png" alt="" class="tackImg" />
                  <div class="task-rank">
                    <p class="name">{{item.name}}</p>
                    <p class="rank">难度：<span>{{item.level}}级</span></p>
                  </div>
                </div>
                <div class="center">{{item.rewardNum}}True</div>
                <div class="right"  @click="buttonClick(item.id)" >抢任务</div>
              </div>
             
          </div>
    </div>
    <div v-show="loading" slot="bottom" class="loading"> 这个div是为让上拉加载的时候显示一张加载的gif图
     <img src="../../base/loading/loading.gif">
    </div>
  </load-more>
 </section>
</template>
<script>
  import loadMore from '../scroll/scroll1'
  
  export default {
  name: 'FinancialGroup',
  components: {
     loadMore
  },
  props:{
 
  },
  
  data () {
    return {
      // 上拉加载数据
      scrollHeight: 0,
      scrollTop: 0,
      containerHeight: 0,
      loading: false,
      allLoaded: false,
      bottomText: '上拉加载更多...',
      bottomStatus: '',
      pageNo: 1,
      totalCount: '',
      tempTaskList:[],
      taskList:[]
    }
  },
   mounted() {
      setTimeout(()=>{
           this.getTaskInfo()
      },1000)
    },
  methods: {
       getTaskInfo() {
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        param.append("pageIndex",this.pageIndex)
        param.append("pageSize",this.pageSize)
        this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.code&&res.data){
            if(res.data.code){
              this.hasCode=false
            }
            const data=res.data.result
//          this.taskList=data.content
//          this.tempTaskList=data.content
            console.log(this.tempTaskList)
//             this.$nextTick(()=>{
//              this._initScroll();
//            })
          }
        })
      },
  /* 下拉加载 */
  _scroll: function(ev) {
    ev = ev || event;
    this.scrollHeight = this.$refs.innerScroll.scrollHeight;
    this.scrollTop = this.$refs.innerScroll.scrollTop;
    this.containerHeight = this.$refs.innerScroll.offsetHeight;
  },
  loadBottom: function() {
    this.loading = true;
    this.pageNo += 1;  // 每次更迭加载的页数
    if (this.pageNo == this.totalGetCount) {
      // 当allLoaded = true时上拉加载停止
      this.loading = false;
      this.allLoaded = true;
    }
//  api.commonApi(后台接口，请求参数) 这个api是封装的axios有不懂的可以看vue2+vuex+axios那篇文章
//      .then(res => {
//    setTimeout(() => {
//  要使用的后台返回的数据写在setTimeout里面
//     this.$nextTick(() => {
//      this.loading = false;
//    })
//  }, 1000)
// });

        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        param.append("pageIndex",this.pageIndex)
        param.append("pageSize",this.pageSize)
        this.$http.post(url,param,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res)=>{
            setTimeout(() => {
               this.$nextTick(() => {
                this.loading = false;
                 if(res.data.code&&res.data){
                  if(res.data.code){
                    this.hasCode=false
                  }
                  const data=res.data.result
                  this.taskList=data.content
                  this.tempTaskList=data.content
                  console.log(this.tempTaskList)
      
                  }
              })
            }, 1000)
         
        })
  },
  handleBottomChange(status) {
    this.bottomStatus = status
  }
}
}
</script>
