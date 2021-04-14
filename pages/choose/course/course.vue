<template>
	<view class="content">
		<Header :headTitle="headTitle"></Header>
		<scroll-view scroll-y="true" class="container" :style="[{'height':scrollH+'rpx'}]"> 
			<u-button :custom-style="customStyle" @click="submit">保存选科结果</u-button>
			<view v-for="(item,i) in grpList" class="subject-group" :key="i">
				<view class="group-title">
					<view class="title">{{item.name}}</view>
					<u-button  :custom-style="customStyle" :disabled="item.checklock" @click="courses(item.id)" plain>进入选科</u-button>
				</view>
				<view class="group-main">
					<view style="margin-bottom: 10rpx;">
						<text class="grounp-text">至少选择：<text class="grounp-text" style="color: #189e95;">{{item.min}}科</text></text>
						<text class="grounp-text">至多选择：<text class="grounp-text" style="color: #189e95;">{{item.max}}科</text></text>
					</view>
					<view>
						<text class="grounp-text">分组描述：<text class="grounp-text" style="color: #189e95;">{{item.remark}}</text></text>
					</view>
				</view>
				<view v-if="item.check.length !== 0" class="group-result">
					<view class="grounp-text">分组选科结果展示信息：</view>
					<view class="result-list">
						<view v-for="(value,idx) in item.check" :key="idx" class="result-item">
							{{value.value}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<Toast ref="toast"/>
		<Toptips ref="toptips"/>
	</view>
</template>

<script>
	import Header from "../../../utils/header.vue";
	import Http from "../../../utils/http.js";
	import Toast from "../../../utils/toast.vue";
	import Toptips from "../../../utils/toptips.vue";
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				headTitle: "",
				parentid:null,
				data:[],
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				customStyle: {
					color: '#fff',
					backgroundColor:"#f4a509",
					height:"64rpx",
					fontSize:"28rpx"
				}
			}
		},
		components: {
			Header,
			Toast,
			Toptips
		},
		methods:{
			courses(id){
				uni.navigateTo({url:`../selection/selection?title=选科&id=${id}`})
			},
			getOptionalGroupList(){
				new Http().post('GetOptionalGroupList',{parentid:this.parentid})
					.then((data)=>{
						var [error,res] = data;
						if(res.data.Code === -1){
							// this.errmsg = res.data.Error  
						}else{
							let result = res.data.result;
							this.data = result.info
							this.$store.commit('addgrpList',result.info)
						}
					})
			},
			submit(){
				let grpList = JSON.parse(JSON.stringify(this.$store.state.grpList));
				let groupcheck = []
				for(let item of grpList){ //接口入参
					groupcheck.push({groupid:item.id,checkinfo:[...item.check]})
				}
				new Http().post('SaveOptionalResult',{groupcheck:JSON.stringify(groupcheck),parentid:this.parentid})
					.then((data)=>{
						var [error,res] = data;
						if(res.data.Code === -1){
							let title = res.data.Error;
							this.$refs.toast.showToast(title,'error',null)
						}else{
							let result = res.data.result;
							this.$refs.toast.showToast(result.message,'success',null);
							uni.navigateTo({url:"../choose"})
						}
					})
			}
		},
		onLoad(option) {
			this.headTitle = option.title;
			this.parentid = option.id;
			this.getOptionalGroupList();
		},
		computed:{
			scrollH:function(){
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth; //计算rpx与px的比例
				let winHeight = sys.windowHeight;
				let viewHeight = winHeight - this.statusBarH - this.customBarH;
				return viewHeight*winrate
			},
			...mapState(['grpList'])
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
<style lang="scss">
	.content{
		.container{
			box-sizing: border-box;
			padding: 20rpx 28rpx 20rpx;
			.subject-group{
				padding: 40rpx;
				-moz-box-shadow:0 0 10rpx #f0f0f0;
				-webkit-box-shadow:0 0 10rpx #f0f0f0;
				box-shadow: 0 0 8rpx #f0f0f0;
				border: 1px solid #f1f1f1;
				margin-bottom: 40rpx;
				margin-top: 20rpx;
				.group-title{
					border-bottom:1px solid #d7d7d7;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					padding-bottom: 10rpx;
					.title{
						font-size: 48rpx;
						color: #333;
					}
				}
			}
			.group-main{
				padding: 40rpx 0;
				.grounp-text{
					color: #4a4a4a;
					font-size: 28rpx;
				}
			}
			.group-result{
				padding-top: 26rpx;
				border-top: 1px dashed #d7d7d7;
				.result-list{
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.result-item{
						width: 30%;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						margin-top: 26rpx;
						color: #f4a509;
						font-size: 28rpx;
						border-radius: 4rpx;
						border: 1px solid #f4a509;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>