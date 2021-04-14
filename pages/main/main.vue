<template>
	<view>
		<Header v-on:onClick="show"></Header>
		<scroll-view scroll-y="true" :style="[{'height':scrollHeight+'rpx'}]">
			<PersonBox></PersonBox>
			<mainModule></mainModule>
		</scroll-view>
		<uni-drawer ref="draw" open>
			<view>
				<Drawer></Drawer>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import Header from './header.vue';
	import PersonBox from './personBox.vue';
	import Drawer from './drawer.vue';
	import mainModule from './mainModule.vue';
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		components: {
			Header,
			PersonBox,
			Drawer,
			mainModule
		},
		methods: {
			show() {
				this.$refs.draw.open();
			},
			hide() {
				this.$refs.draw.close();
			}
		},
		computed:{
			scrollHeight: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth; //计算rpx与px的比例
				let winHeight = sys.windowHeight;
				let viewHeight = winHeight - this.statusBarH - this.customBarH;
				return viewHeight*winrate
			}
		}
	}
</script>
<style>
	page{
		background-color: #F4F4F4;
	}
</style>
<style lang="scss">	
	.uni-drawer__content {
		background-color: #f3f9f8 !important;
	}
	.side-menu-box{
		background-color: #f3f9f8 !important;
	}
	.uni-drawer {
		top: var(--status-bar-height) !important;
	}

	.uni-drawer--left {
		width: 70% !important;
	}
</style>
