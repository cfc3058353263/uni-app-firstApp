<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="header-itme" :style="[{
				'height':customBarH+'px',
				'padding-top':statusBarH + 'px',
				'padding-left':'30rpx',
				'padding-right':customBarW+'px',
				'line-height':customBarH+'px'
				}]">
				<view class="icon icon-dehaze toggle-box" @tap="show"></view>
				<view class="right-item">
					<view class="icon icon-lock"></view>
					<view class="icon icon-exit_to_app" @click="exit"></view>
				</view>
			</view>
		<!-- #endif -->
		
		<!-- #ifdef H5 -->
			<view class="header-itme" style="height: 90rpx;padding: 0 30rpx;">
				<view class="icon icon-dehaze toggle-box" @tap="show"></view>
				<view class="right-item">
					<view class="icon icon-lock"></view>
					<view class="icon icon-exit_to_app" @click="exit"></view>
				</view>
			</view>
		<!-- #endif -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				customBarW: this.customBarWidth,
			}
		},
		methods:{
			show(){
				this.$emit("onClick")
			},
			exit(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css.scss";
	view{
		box-sizing: content-box; //解决uview中对view的样式冲突
	}
	.header-itme{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #2ca59d;
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
	.toggle-box{
		border: 1px solid rgba(255, 255, 255, 0.4);
		color: #fff !important;
		font-size: 42rpx !important;
	}
</style>
