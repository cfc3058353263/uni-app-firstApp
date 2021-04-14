<template>
	<view class="wrap">
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
			navbarHeight:this.customBar
		};
	},
	methods: {
		showTips(title,type="success") {
			this.$refs.uTips.show({
				title: title,
				type:type
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
</style>