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
				<span @click="searchItem" class="cancel">取消</span>
			</div>

		</div>
		<div class="search-content" v-show="keyword">
			<div class="item" v-for="item of list">
				<div class="left">
					<img :src="item.imgUrl" alt="" class="tackImg" />
					<div class="task-rank">
						<p>{{item.name}}</p>
						<p>难度：<span>{{item.rank}}</span></p>
					</div>
				</div>
				<div class="center">{{item.number}}</div>
				<div class="right"><button>抢</button></div>

			</div>
			<div class="search-item border-bottom " v-show="hasnoData">没有找到匹配数据</div>
		</div>
		<ul class="select-wrapper" v-show="isShow">
			<li class="border-bottom select-item" :class="{ active: active==index }" v-for="(item,index) of itemList" :key="item.id" @click="handleClick(index,item.name)">{{item.name}}</li>
		</ul>
		<div class="mask" v-show="showMask">
			
		</div>
	</div>

</template>

<script>
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
				active:0,
				showMask:false
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
					for(let i in this.taskList) {
						if(this.taskList[i].name.indexOf(this.keyword) >= 0) {
							result.push(this.taskList[i]);
						}
					}
					console.log(result);
					this.list = result;
				}, 100);
			}
		},
		methods: {
			searchItem() {
				this.show = !this.show;
				this.isShow = false;
			},
			handleClick(index,name) {
				this.active=index
				this.isShow = false;
				this.showMask = false;
				this.isActive=true
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
					this.showMask=true
				} else if(this.lastItemIndex == res) {
					this.isShow = false;
					this.showMask=false
					this.lastItemIndex = -1;
				}

				if(res == 0) {
					this.itemList = [{
							id: "01",
							name: "不限"
						},
						{
							id: "02",
							name: "个人"
						},
						{
							id: "03",
							name: "团队"
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
	.header {
		position: fixed;
		top: 0;
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
			border-radius:20px;
			margin:4px 10px 4px;
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
				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
			}
			.cancel{
				font-size: 13px;
				padding-left:7px;
				cursor: pointer;
			}
		}
	}
	
	.select-wrapper {
		background: #fff;
		 z-index:80;
		top: 50px;
		position: absolute;
		left: 0;
		right: 0;
		.select-item {
			height: 43px;
			line-height: 43px;
			padding: 0 0 0 22px;
			font-size: 15px;
			&.active:after{
				content: '';
			    display: inline-block;
			    border: 3px solid #00AAEE;
			    border-top-width: 0;
			    border-right-width: 0; 
			    width: 16px;
			    height: 10px;
			    -webkit-transform: rotate(-50deg);
			    position: absolute;
			    top:10px;
			    right:19px;
			}
		}
	}
	
	.search-content {
		position: absolute;
		background: #fff;
		left: 0;
		right: 0;
		bottom: 60px;
		top:50px;
		z-index: 1;
		overflow-y: scroll;
		.search-item{
		 font-size: 12px;	
		 padding-left: 20px;
		}
		.item{
			display: flex;
			justify-content: left;
			align-items: center;
			padding: 10px 15px;
		   .left{
				.task-rank{
					display: inline-block;
				}
				.tackImg {
					width: 50px;
					height: 50px;
				}
			}
			.center {
				flex: 1;
			}
			.right {
				/*width: 1.2rem*/
			}
		}
	}
	.mask{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #000;
		opacity: 0.5;
		z-index: 70;
	}
	
</style>