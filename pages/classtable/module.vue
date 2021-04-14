<template>
	<view class="content">
		<view class="container">
			<view class="section">
				<view class="selectedDay" style="display: flex;justify-content: center;align-items: center;" @tap="tapWeek">
					{{week}}
					<view class="icon icon-keyboard_arrow_down"></view>
				</view>
				<view v-if="weekType" style="position: absolute;">
					<view v-for="(item,i) in weekarr" :key="i" v-if="item!==week" @tap="checkweek(item,i)"class="selectedDay">
						{{item}}
					</view>
				</view>
				<view v-for="(item,i) in courseList" :key="i" class="todayWeekCN" :style="[{'background-color':i%2!==0?'#f8f8f8':'#fff'}]">
					{{item.partname}}
				</view>
			</view>
			<view class="scoll-box">
				<scroll-view scroll-x="true" :style="[{'width':scrollWidth+'rpx','white-space':'nowarp'}]">
					<view class="curriculum">
						<view class="curriculum-title">
							课程
						</view>
						<view v-for="(item,i) of courseList" :key="i" class="curriculum-item" :style="[{'background-color':i%2!==0?'#f8f8f8':'#fff','color':'#189e95'}]">
							{{item.coursename}}
						</view>
					</view>
					<view class="curriculum">
						<view class="curriculum-title">
							教师
						</view>
						<view v-for="(item,i) of courseList" :key="i" class="curriculum-item" :style="[{'background-color':i%2!==0?'#f8f8f8':'#fff'}]">
							{{item.teacher}}
						</view>
					</view>
					<view class="curriculum-place">
						<view class="curriculum-title">
							地点
						</view>
						<view v-for="(item,i) of courseList" :key="i" class="curriculum-item" :style="[{'background-color':i%2!==0?'#f8f8f8':'#fff'}]">
							{{item.place}}
						</view>
					</view>
					<view class="curriculum">
						<view class="curriculum-title">
							时间
						</view>
						<view v-for="(item,i) of courseList" :key="i" class="curriculum-item" :style="[{'background-color':i%2!==0?'#f8f8f8':'#fff'}]">
							{{item.checktime}}
						</view>
					</view>

				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from "../../utils/http.js";
	export default {
		data() {
			return {
				headTitle: "",
				weekarr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				week: "",
				weekType:false,
				courseList:[],
				courseAll:[]
			}
		},
		methods: {
			getSection() { //获取课程表
				new Http().post("GetCourse", {week:'-1',type:'user'})
					.then((data) => {
						var [error, res] = data;
						if (res.data.Code === -1) {
							this.errmsg = res.data.Error
						} else {
							let result = res.data.result;
							this.courseAll = result
							for(let item of result){
								item.week === this.getWeek()+1 && this.courseList.push(item)
							}
						}
					})
			},
			getWeek() { //今天是星期几(0~6对应一到日)
				var d = new Date().getDay();
				if (d == 0) {
					return 6;
				} else {
					return (d - 1);
				}
			},
			tapWeek(){
				this.weekType =!this.weekType;
			},
			checkweek(item,i){
				this.week = item
				this.weekType =!this.weekType
				this.courseList = []
				for(let item of this.courseAll){
					item.week === i+1 && this.courseList.push(item)
				}
			}
		},
		created() {
			this.getSection();
			this.week = this.weekarr[this.getWeek()];
		},
		computed: {
			scrollWidth: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth; //计算rpx与px的比例
				let scrollViewWidath = winrate * winWidth - 28 * 2 - 160
				return scrollViewWidath
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css.scss";

	.container {
		background-color: #FFFFFF;
		padding-left: 28rpx;
		padding-right: 28rpx;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		white-space: nowrap;
	}

	.section {
		display: inline-block;
		width: 160rpx;
		.selectedDay {
			width: 160rpx;
			height: 80rpx;
			line-height: 100rpx;
			text-align: center;
			background-color: #189e95;
			color: #fff;
			border-bottom: 1px solid #47c2b9;
			color: #FFFFFF;
			font-size:28rpx;
		}
	}

	.todayWeekCN {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-right: 1px solid #f1f1f1;
		color: #4a4a4a;
		font-size: 28rpx;
		border-bottom: 1px solid #f1f1f1;
	}

	.scoll-box {
		display: inline-block;
		width: 100%;
		vertical-align: top;

		.curriculum {
			display: inline-block;
			width: 160rpx;
			vertical-align: top;
			.curriculum-title{
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #f8f8f8;
				vertical-align: top;
				font-size: 28rpx;
				color: #4a4a4a;
			}
			.curriculum-item {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #f8f8f8;
				vertical-align: top;
				font-size: 28rpx;
				border-right: 1px solid #f1f1f1;
				color: #4a4a4a;
				border-bottom: 1px solid #f1f1f1
			}
		}
		.curriculum-place{
			display: inline-block;
			vertical-align: top;
			.curriculum-title{
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #f8f8f8;
				vertical-align: top;
				font-size: 28rpx;
				color: #4a4a4a;
			}
			.curriculum-item {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: #f8f8f8;
				vertical-align: top;
				font-size: 28rpx;
				border-right: 1px solid #f1f1f1;
				color: #4a4a4a;
				padding: 0 10rpx;
				border-bottom: 1px solid #f1f1f1
			}
		}
	}
</style>
