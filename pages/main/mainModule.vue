<template>
	<view class="content">
		<view class="MenuModule">
			<view class="title-box">
				<view class="left-title">我的课程表</view>
				<view class="right-title" style="color: #f4a509;">20-21学年第一学期课表</view>
			</view>
			<classtable></classtable>
		</view>
	</view>
</template>

<script>
	import Classtable from '../classtable/module.vue';
	import Http from '../../utils/http.js';
	export default {
		components: {
			Classtable
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {}

	.MenuModule {
		margin-bottom: 20rpx;

		.title-box {
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			padding: 0 28rpx;
			height: 120rpx;
			line-height: 120rpx;
			border-bottom: 1px solid #f1f1f1;
			.left-title {
				font-size: 32rpx;
				font-weight: bold;
			}

			.right-title {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
</style>
