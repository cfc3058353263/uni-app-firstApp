<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view :style="[{'padding-top':customBar+'px'}]"></view>
		<!-- #endif -->
		<view class="logo">
			<!-- #ifdef MP-WEIXIN -->
			<image class="logo-img" src="../../static/images/logo.png" mode="heightFix"  />
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<image class="logo-img" src="../../static/images/logo.png" mode="heightFix"  />
			<!-- #endif -->
			<!-- #ifdef MP-DINGTALK -->
			<image class="logo-img" src="../../static/images/logo.png" mode="widthFix"  />
			<!-- #endif -->
		</view>
		<text class="system_name" space='nbsp'>学 生 自 主 发 展 平 台</text>
		<view class="login-view">
			<input type="text" class="login-input" placeholder="用户名" :value="username" name="input" @input="changeUser" />
		</view>
		<view class="login-view">
			<input type="text" class="login-input" placeholder="密码" :value="password" name="input" password="true" @input="changePass" />
		</view>
		<view class="login-view">
			<view class="login-button" @click="login">{{loading?"登录.....":"登录"}}</view>
		</view>
		<!-- <view class="login-view">
			<uni-data-checkbox class="checkbox" selectedColor="green" selectedTextColor="#fff" multiple v-model="value"
			 :localdata="range" @change="change"></uni-data-checkbox>
		</view> -->
		<image style="position: absolute;bottom: 0;" src="../../static/images/login_bg.png" mode="widthFix"></image>
		<uni-popup ref="popup" animation="true" type="message">
			 <uni-popup-message type="error" :message="errmsg" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import Http from "../../utils/http.js"
	export default {
		data() {
			return {
				value: [],
				range: [{
					"value": 0,
					"text": "记住密码"
				}, {
					"value": 1,
					"text": "自动登录"
				}],
				username: "",
				password: "",
				loading:false,
				errmsg:"",
				customBar:this.customBar
			}
		},
		methods: {
			change(e) {
				console.log('e:', e.detail.data[0].value);
				if (e.detail.data.length === 2) {

				} else if (e.detail.data.length === 1) {
					if (e.detail.data[0].value === 0) {

					}
				}
			},
			changeUser(e) {
				this.username = e.detail.value;
			},
			changePass(e) {
				this.password = e.detail.value;
			},
			login() {
				// if (this.username === "") {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入账号'
				// 	});
				// 	return
				// }
				// if (this.password === "") {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入密码'
				// 	});
				// 	return
				// }
				let openid = uni.getStorageSync('openid')
				let type = uni.getStorageSync('multitype')
				this.loading = true
				new Http().post("Login", {
					// username: this.username,
					// password: this.password,
					username: "33022620040319432X",
					password: "123456",
					multitype: type,
					multiopenid: openid
				}).then((data) => {
					var [error, res] = data;
					if(res.data.Code === -1){
						this.loading = false
						this.errmsg = res.data.Error  
						this.$refs.popup.open()
					}else{
						let result = res.data.result;
						uni.setStorageSync('UserContext',JSON.stringify(result)); //loagin usercontext
						new Http().post("UserProfiles",{})
							.then((data)=>{
								var [error,res] = data;
								if(res.data.Code === -1){
									this.loading = false
									this.errmsg = res.data.Error  
									this.$refs.popup.open()
								}else{
									let result = res.data.result;
									uni.setStorageSync('UserInfo',JSON.stringify(result)); //UserProfiles UserInfo
									this.loading = false
									uni.redirectTo({ url: '../main/main' });
								}
							})
					}
				})
			}
		},
		onLoad() {
		},
	}
</script>
<style>
	page {
		background-color: #0088cc;
	}
</style>
<style lang="scss">
	@import "../../uni.scss";

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		margin-top: 180rpx;
		.logo-img {
			height: 100rpx;
		}
	}

	.system_name {
		font-size: 60rpx;
		color: #fff;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.login-view {
		margin-bottom: 30rpx;

		.login-input {
			width: 520rpx;
			text-align: center;
			height: 108rpx;
			background-color: #fff;
			border-radius: 8rpx;
			font-size: 28rpx;
			letter-spacing: 4rpx;
			padding: 0;
		}

		.login-button {
			width: 520rpx;
			text-align: center;
			background-color: #5faddc;
			font-size: 40rpx;
			color: #fff;
			letter-spacing: 8rpx;
			height: 108rpx;
			border-radius: 8rpx;
			line-height: 108rpx;
		}
	}

	.checklist-text {
		color: #fff !important;
		font-size: 42rpx !important;
	}

	.checklist-box:last-child {
		margin-right: 0;
	}

	.login-bg {
		// position: absolute;
	}
</style>
