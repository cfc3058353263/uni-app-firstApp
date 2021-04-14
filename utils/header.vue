<template>
	<view v-if="isMpWeixin">	
		<view class="header-itme" :style="[{
			'height':customBarH+'px',
			'padding-top':statusBarH + 'px',
			'padding-left':'30rpx',
			'padding-right':customBarW+'px',
			'line-height':customBarH+'px'
			}]">
			<view class="icon icon-keyboard_arrow_left" @tap="goback"></view>
			<view class="header-title">{{headTitle}}</view>
			<view class="right-item">
				<view class="icon icon-lock"></view>
				<view class="icon icon-exit_to_app"></view>
			</view>
		</view>
	</view>
	<view v-else>
		<view class="header-itme" style="height: 90rpx;padding: 0 30rpx;">
			<view class="icon icon-keyboard_arrow_left" @tap="goback"></view>
			<view class="header-title">{{headTitle}}</view>
			<view class="right-item">
				<view class="icon icon-lock"></view>
				<view class="icon icon-exit_to_app"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {isMpWeixin} from "./EPlatform.js"
	export default {
		props:["headTitle"],
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				customBarW: this.customBarWidth,
				headName:"",
				isMpWeixin:isMpWeixin
			}
		},
		methods:{
			goback(){
				uni.navigateBack({
					
				})
			}
		},
		created() {
		}
	}
</script>

<style lang="scss" scoped>
	view{
		box-sizing: content-box; //解决uview中对view的样式冲突
	}
	@import "../static/css.scss";
	.header-itme{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #2ca59d;
		.icon{
			font-size: 40rpx;
			color: #fff;
		}
		.header-title{
			color: #ffff;
			font-size: 32rpx;
		}
		.right-item{
			display: flex;
			align-items: center;
			padding-right: 30rpx;
			.icon{
				font-size: 40rpx;
				color: #FFFFFF;
				margin-right: 10rpx;
			}
		}
	}
</style>
