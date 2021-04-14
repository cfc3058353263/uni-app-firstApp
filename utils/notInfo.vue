<template>
	<view class="content">
		<text class="text" space='nbsp'>{{title}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:"暂无信息"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		justify-content: center;
		.text{
			font-size: 32rpx;
			color: #999;
			padding: 20rpx 0;
		}
	}
</style>
