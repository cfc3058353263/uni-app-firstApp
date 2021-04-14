<script>
	import {EPlatform} from "./utils/EPlatform.js" //平台判断
	import {isMpWeixin,Platform} from './utils/EPlatform.js' //平台判断
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			// uni.getStorageSync('UserContext') && uni.redirectTo({url:"pages/main/main"})
			if (isMpWeixin) {
				//微信顶部导航栏适配
				uni.getSystemInfo({
					success:function(e){
						Vue.prototype.statusBar = e.statusBarHeight //状态栏的高度	
						let custom = wx.getMenuButtonBoundingClientRect() //获取微信菜单按钮（右上角胶囊按钮）的布局位置信息 坐标信息以屏幕左上角为原点。
						Vue.prototype.customBar = custom.bottom-e.statusBarHeight +custom.top - e.statusBarHeight //微信菜单按钮区域的高度
						Vue.prototype.customBarWidth = e.windowWidth - custom.left  //微信菜单按所占的区域
					}
				})
				uni.setStorage({
					key:"multitype",
					data:0
				})
				//获取微信的openid
				uni.login({
					success: res => {
						//code值(5分钟失效)
						console.log(res.code);
						let appid = 'wxf530b3d02ff79c77'; //测试appid
						let secret = '725833db57b3a20420f98cca65ac2cae'; //测试的secret 
						//wx接口路径
						let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
							res.code + '&grant_type=authorization_code';
						uni.request({
							url: url,
							method: 'GET',
							success: result => {
								uni.setStorage({
									key: 'openid',
									data: result.data.openid
								})
							}
						});
					}
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
