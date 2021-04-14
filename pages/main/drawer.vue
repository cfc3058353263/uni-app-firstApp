<template>
	<view class="side-menu-box">
		<view class="side-person">
			<view class="person-box">
				<view class="person-imgbox">
				<image class="person-image" :src="personImage" />
				</view>
				<view class="person-information">
					<view class="person-name">{{personName}}</view>
					<view>{{personClassroom}}</view>
				</view>
			</view>
			<view class="icon-exit icon icon-exit_to_app"></view>
		</view>
		<scroll-view class="side-menu" scroll-y="true" :style="[{'height':scrollH+'rpx'}]">
			<view v-for="(item,i) in menuList">
				<view class="menu" @click="navigation(item.code,item.title)">
					<view :class="['menu-icon','icon',`${item.icon}`]"></view>
					<text class="menu-title" space="nbsp">{{item.title}}</text>
				</view>
	  		</view>
			<view style="width: 100%;height: 50rpx;"></view>
		</scroll-view>
		<uni-popup ref="popup" animation="true" type="message">
			 <uni-popup-message type="error" :message="errmsg" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import Http from "../../utils/http.js"
	export default {
		data(){
			return{
				personImage:"http://192.168.1.150:8083/Addons/GS.Sub.SystemManager/Pages/GetResourceFile.aspx?typeId=person&sid=",
				personName:"",
				personClassroom:"",
				menuList:[],
				errmsg:""
			}
		},
		methods:{
			getPersonInfo(){
				const userContext =JSON.parse(uni.getStorageSync("UserContext"));
				this.personImage = this.personImage + userContext.picture;
				this.personName = userContext.name;
				this.personClassroom = userContext.section;
			},
			navigation(code,title){
				console.log(code,title)
				uni.navigateTo({url:`../choose/choose?title=${title}`})
			}
		},
		created() {
			this.getPersonInfo()
			new Http().post("ModuleCenter",{})
				.then((data)=>{
					var [error,res] = data;
					if(res.data.Code === -1){
						this.errmsg = res.data.Error
						this.$refs.popup.open()
					}else{
						let result = res.data.result;
						this.menuList = result
					}
			})
		},
		computed:{
			scrollH:function(){
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750/winWidth; //计算rpx与px的比例
				let winHeight = parseInt(sys.windowHeight*winrate)
				let scrollHeight = this.statusBar? winHeight-this.statusBar-68*2-140 : winHeight-68*2-140
				return scrollHeight
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/css.scss";
	.side-menu-box {
		width: 100%;
		.side-person {
			width: 100%;
			padding: 68rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.person-box {
				display: flex;
				justify-content: left;
				align-items: center;
				.person-imgbox{
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					box-shadow: 0 0 8px #ccc;
					transition:0.1s ease-out;
					margin:0 34rpx;
						.person-image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
				}
				.person-information{
					margin-left: 10rpx;
					.person-name{
						font-size: 36rpx;
						font-weight: bold;
					}
				}
			}
			.icon-exit{
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
				font-size: 40rpx;
				color: #189e95;
			}
		}
		.side-menu{
			width: 100%;
			height: 100%;
			margin-bottom: 20rpx;
			.menu{
				height: 100rpx;
				padding-left: 60rpx;
				display: flex;
				align-items: center;
				justify-content: left;
				.menu-title{
					font-size: 32rpx;
					color: #189e95;	
				}
				.menu-icon{
					width: 50rpx;
					height: 50rpx;
					margin-right: 30rpx;
					text-align:center;
					font-size: 48rpx;
					line-height: 50rpx;
				}
			}
			.menu:active{
				background-color: #47c2b9;
			}
		}
	}
</style>
