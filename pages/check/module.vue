<template>
	<view class="content">
		<view class="container">
				<u-subsection :list="list" :current="1"></u-subsection>
		<view class="check-content">
			<view class="item">
				<view class="check-category">早自习</view>
				<view class="check-category">--:--:--</view>
				<view class="check-category">未到</view>
			</view>
			<view class="item">
				<view class="check-category">早自习</view>
				<view class="check-category">--:--:--</view>
				<view class="check-category">未到</view>
			</view>
			<view class="item">
				<view class="check-category">早自习</view>
				<view class="check-category">--:--:--</view>
				<view class="check-category">未到</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import Http from "../../utils/http.js";
	export default {
		data(){
			return {
					list: [
						{
							name: '今天'
						}, 
						{
							name: '本周'
						}, 
						{
							name: '本月'
						},
						{
							name: '本学期'
						}
					],
					current: 1
				}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css.scss";
	.container {
		background-color: #FFFFFF;
		padding: 20rpx 28rpx 40rpx;
		white-space: nowrap;
		.check-content{
			padding: 40rpx;
			border: 1px solid #f1f1f1;
			display: flex;
			justify-content: center;
			align-items: center;
			.item{
				
			}
		}
	}
</style>
