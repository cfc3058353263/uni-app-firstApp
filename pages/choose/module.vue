<template>
	<view class="content">
		<scroll-view scroll-y="true" :style="[{'height':scrollH+'rpx'}]" class="container">
			<u-subsection :list="list" :current="current" button-color="#f4a509" bg-color="#f8f8f8" active-color="#ffffff" @change="sectionChange"></u-subsection>
			<view class="subjectBox">
			<!-- 修改选课 -->
				<view v-show="current === 0 || current === 1" v-for="(item,i) in startList" :key="i" style="margin-bottom: 20rpx;">
					<view class="my-select-subject">
						<view class="subject-title">
							<view class="subjectButton">
								<view class="title-text">{{item.name}}</view>
								<u-button size='mini' :custom-style="customStyle" type="success" @click="courses(item.id)" plain>修改选课</u-button>
							</view>
							<view style="color: #fff;font-size:24rpx">{{item.deadline}}</view>
						</view>
					</view>
					<view class="subject-main ">
						<view v-for="(course,idx) in item.check" :key="idx" class="courseItem">
							{{course}}
						</view>
					</view>
					<view class="subject-main">
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-for="(Ranking,index) in item.ranks" :key="index" class="ranking">
							<view class="top-text">{{i}}</view>
							<view class="number">{{Ranking}}</view>
						</view>
					</view>
				</view>
			<!-- 未开始选课 -->
				<view view v-show="current === 0 " v-for="(item,i) in notStartList" :key="i" style="margin-bottom: 20rpx;">
					<view class="my-select-subject">
						<view class="subject-title"style="background-color: #f4a509;">
							<view class="subjectButton">
								<view class="title-text">{{item.name}}</view>
							</view>
							<view style="color: #fff;font-size:24rpx">未开始</view>
						</view>
					</view>
					<view class="subject-main ">
						<view class="courseItem" style="width: 100%;">
							进入选科>
						</view>
					</view>
					<view class="subject-main">
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-for="(Ranking,index) in item.ranks" :key="index" class="ranking">
							<view class="top-text">{{i}}</view>
							<view class="number">{{Ranking}}</view>
						</view>
					</view>
				</view>
			<!-- 历史选课 -->
				<view view v-show="current === 0 || current === 2" v-for="(item,i) in endList" :key="i" style="margin-bottom: 20rpx;">
					<view class="my-select-subject">
						<view class="subject-title"style="background-color: #f4a509;">
							<view class="subjectButton">
								<view class="title-text">{{item.name}}</view>
							</view>
							<view style="color: #fff;font-size:24rpx">已结束</view>
						</view>
					</view>
					<view class="subject-main ">
						<view class="courseItem" style="width: 100%;">
							进入选科>
						</view>
					</view>
					<view class="subject-main">
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-if="(JSON.stringify(item.ranks) == '{}')" class="ranking">
							<view class="ranking">
								<view class="top-text">--</view>
								<view class="number">--</view>
							</view>
						</view>
						<view v-for="(Ranking,index) in item.ranks" :key="index" class="ranking">
							<view class="top-text">{{i}}</view>
							<view class="number">{{Ranking}}</view>
						</view>
					</view>
				</view>
					<NotInfo v-if="current === 0 && startList.length + notStartList.length + endList === 0"/>
					<NotInfo v-if="current === 1 && startList.length === 0"/>
					<NotInfo v-if="current === 2 && endList.length === 0"/>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import Http from "../../utils/http.js";
	import moment from 'moment';
	import NotInfo from '../../utils/notInfo.vue';
	export default {
		data(){
			return {
					list: [
						{name: '全部'}, 
						{name: '进行中'}, 
						{name: '历史选课'}
					],
					current: 1,
					statusBarH: this.statusBar,
					customBarH: this.customBar,
					notStartList:[],
					startList:[],
					endList:[]
				}
		},
		methods:{
			sectionChange(index) { //切换
				this.current = index;
			},
			courses(id){
				uni.navigateTo({url:`./course/course?title=选科&id=${id}`})
			},
			getOptionalList(){ //获取数据
				new Http().post("GetOptionalList",{ongoing:-1})
					.then((data)=>{
						var [error,res] = data;
						if(res.data.Code === -1){
							this.errmsg = res.data.Error;
						}else{
							let result = res.data.result;
							for(let item of result){
								if(moment(item.starttime).diff(moment(),'minutes')>0){
									this.notStartList.push(item)
								}else if(moment(item.endtime).diff(moment(),'minutes')<0){
									this.endList.push(item)
								}else{
									const duration = moment.duration(moment(item.endtime).diff(moment()))._data
									const hours = moment.duration(moment(item.endtime).diff(moment(),"hours"))._milliseconds
									const deadline = `进行中，距离结束时间还有${hours}时${duration.minutes}分${duration.seconds}秒`
									let list = item;
									list['deadline'] = deadline;
									this.startList.push(item);
								}
							}
						}
					})
			}
		},
		computed:{
			scrollH:function(){
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth; //计算rpx与px的比例
				let winHeight = sys.windowHeight;
				let viewHeight = winHeight - this.statusBarH - this.customBarH;
				return viewHeight*winrate
			}
		},
		components:{
			NotInfo
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css.scss";
	.content{
		.container {
		padding: 20rpx 28rpx 40rpx;
			box-sizing:border-box;
			background-color: #FFFFFF;
			white-space: nowrap;
			.subjectBox{
				padding: 20rpx;
				border-top: 1px solid #FFFFFF;
				background-color: #f8f8f8;
				.my-select-subject{
					.subject-title{
						background-color: #47c2b9;
						border-radius: 4px 4px 0px 0px;
						padding: 20rpx 40rpx;
						.subjectButton{		
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 20rpx;
							.title-text{
								color: #fff;
								font-size: 18px;
								white-space: pre-wrap;
								margin-right: 20rpx;
							}
						}
					}
				}
				.subject-main{
					padding: 40rpx 40rpx 0;
					background-color: #FFFFFF;
					border-bottom: 1px solid #f1f1f1;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.courseItem{
						width: 46%;
						height: 120rpx;
						line-height: 120rpx;
						border: 1px solid #189e95;
						border-radius: 4px;
						text-align: center;
						font-size: 40rpx;
						margin-bottom: 40rpx;
						color: #189e95;
					}
					.ranking{
						width: 100%;
						height:200rpx;
						background-color: #fff7e5;
						color: #f4a509;
						border-radius: 4px;
						margin-bottom: 20px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.top-text{
							font-size: 36rpx;
						}
						.number{
							font-size: 52rpx;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
