<template>
	<view class="person-box">
		<image src="../../static/images/person_bg.png" mode="aspectFill" class="person-imgbackground" />
		<view class="person-picture">
			<image class="person-image" :src="personImage"/>
		</view>
		<view class="person-information">
			<view class="person-info" style="font-size: 40rpx;">{{personName}}</view>
			<view class="person-info">{{personClassroom}}</view>
			<view class="person-info">[班主任] {{personTeacher}}</view>
			<view class="person-info">[当前身份] {{personRelation}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			const userContext =JSON.parse(uni.getStorageSync("UserContext"));
			return{
				personName: userContext.name,
				personClassroom: userContext.section,
				personTeacher: userContext.teacher,
				personRelation: userContext.relation,
				personImage: "http://192.168.1.150:8083/Addons/GS.Sub.SystemManager/Pages/GetResourceFile.aspx?typeId=person&sid="+userContext.personImage
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.person-box {
		position: relative;
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: left;
		.person-imgbackground{
			position: absolute;
			height: 200rpx;
			width: 100%;
			z-index: -1;
		}
		.person-picture{
			display: inline-block;
			margin: 0 40rpx;
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			transition: 0.1s ease-out;
			box-shadow: 0 4px 8px #333;
			.person-image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.person-information {
			.person-info {
				color: #fff;
				font-size: 24rpx;
			}
		}
	}
</style>
