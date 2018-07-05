<template>
    <div>
        <div class='space'></div>
        <div class="taskCont">
            <div class='title' v-model="titleDate">
                <img :src="titleDate.imgUrl" alt="" class="tackImg left" />
                <div class="left titleCont">
                    <h2>{{titleDate.title}}</h2>
                    <p class="orange">{{titleDate.number}}</p>
                    <p>难度:<i class="orange"> {{titleDate.level}}</i> </p>
                </div> 
          </div>
          <div class="content">
              <div class="cont-title">任务周期</div>
              <p>2018-06-21至2018-07-02</p>
              <div class="cont-title">人数限制</div>
              <p>3人</p>
              <div class="cont-title">任务描述</div>
              <div class="cont-detail">区块链的出快大小和出块速度应当怎么设置比较合适</div>
              <div class="cont-detail">
                  区块链3.0之后区块链应用会迎来井喷似的发展，数据会越来越多，会越来越多样化，现在BTC的块大小为1M，那么到达区块链3.0时代之后，区块链的数据块大小以及出块速度设置为多少较为合适。
              </div>
              <div class="cont-detail">
                  文字和图片量超1000字，为原创文章。 对于某些算法说明，要给出伪代码或者对应的流程图、架构图。 不能仅仅是网上各种资讯文章的摘抄。
              </div>
              <div class="cont-title">提交地址</div>
              <p>https://run.mockplus.cn/xZ8gk87/index.html</p>
          </div>
        </div>
        <div class='space'></div>          
        <div class="bottom" v-if="type==='detail' ">
            <div class="cont-title">完成情况</div>
            <p><i>提交地址：</i>https://run.mockplus.cn/index.html </p>
            <p><i>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 明：</i>0621任务提交，区块链的出快大小 </p>
            <p><i>审核结果：</i>第一名  </p>
            <p><i>奖励收入：</i>200true </p>          
        </div>
        <div class="bottom" v-if="type==='registration' ">
            <div class="cont-title">报名情况</div>
            <p>需要3人，已报<i class="orange">2</i>人</p>
            <div class='button one'>抢任务</div>
            <div class='button two'>推荐转发</div>
            <div class='button three'>注册</div>
            <div class='button four'>已满</div>            
        </div>
        <div class="bottom" v-if="type==='commit' ">
            <input class="input-top inp" placeholder="提交地址"/> 
            <input class="input-bottom inp"  placeholder="说明"/>
            <div class='button two' >提交审核</div>            
                      
        </div>
        <div class="robTask" v-if="type==='robTask' ">
            <div class="cont-title">报名情况</div>
            <div class="robTask-flex" v-for='item of roleList'>
                <div class="one">前端H5</div>
                <div class="two">（需要3人，已报2人）</div>
                <div class="three">1000true</div>
                <div class="four ">抢任务</div> 
            </div>
        </div>

        <div class='space'></div>                  
 
    </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  export default {
    name: "TaskDetail",
    components: {
      Tabs,
    },
    data() {
      return {
        titleDate: {
            imgUrl:"http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png",
            title:'我是兼职任务标题',
            number:'200true',
            level:'B级'

        },
        // type: 'detail'
        type: 'registration', 
        // type: 'commit',                     
        // type: 'robTask',
        roleList:[{
        }]          
    
      }
    },
    methods: {
    
    },
    mounted() {
     
    }

  }
</script>

<style scoped lang="less">
.space {
    background: #eee;
    height: 10px;
}
.left {
    float: left;
}
.right {
    float: right;
}
.cont-title {
    width: 60px;
    height: 14px;
    line-height: 14px;
    padding-left: 5px;
    margin-top: 20px;
    font-size: 14px;
    color: #00AAEE;
    border-left: #00AAEE solid 2px;
}
.orange {
    font-size: 15px;
    color: #FFAE0F;
}
.taskCont {
    padding: 15px;
    padding-bottom: 25px;
    .title {
        padding-bottom: 15px;
        border-bottom: #E0E4E5 solid 1px;
        .tackImg {
            width: 100px;
            height: 100px;
            vertical-align: top;
        }
        .titleCont {
            margin-left: 20px;
            padding-top: 10px;
        }
        
        p{
            color:#A1ACB4;
            font-size: 15px;            
            margin-top: 10px
        }
        .orange {
            font-size: 15px;
            color: #FFAE0F;
        }
        overflow: hidden;
    }
   
    .content {
        p {
            margin: 15px 0 25px 0;
         }
       
        .cont-detail {
            font-size: 14px;
            margin-top: 15px;
        }
    }
    
  }
.bottom {
    font-size: 14px;
    color: #2E353B;
    padding: 15px;
    p {     
        margin-top: 20px;
        i {
            color: #A1ACB4;
        }
        .orange {
            font-size: 15px;
            color: #FFAE0F;
        }
    }
    .button {
        width:100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        border-radius: 4px;
        margin-top: 15px;
    }
    .one {
        background-color: #FFAE0F;
        color: #fff;
    }
    .two {
        background-color: #00AAEE;
        color: #fff;           
    }
    .three {
        border: #00AAEE 1px solid;
        color: #00AAEE;   
    }
    .four {
        background-color:#e6e0e0;
    }
    input {
        width: 100%;
        // display: block;
    }
    .input-top {
        height: 40px;
    }
    .input-bottom {
        height: 125px;
    }
    .inp{
        font-size:15px;
        background-color: #FAFAFA;
        border:1px solid #E7E7E7;
        border-radius: 5px;
        margin-top:20px;
        padding-left: 10px;
        box-sizing: border-box;
    }
}
.robTask {
   padding: 13px;
   .robTask-flex {
        font-size: 13px;
        margin-top: 23px;
        display: flex;
        height: 40px;
        border-bottom: 1px solid #E0E4E5;
        .one {
            flex: 2;
            padding-top: 5px;
        }
        .two {
            flex: 4;
            padding-top: 5px;
            

        }
        .three {
            flex: 2;
            margin-left: 25px;
            text-align: center;
            padding-top: 5px;
            
            
        }
        .four {
            flex: 2;
            margin-left: 30px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            background-color: #00AAEE;
            border-radius: 5px;
        }
   }
}

  
</style>