<template>
	<view class="content">
		<Header :headTitle="headTitle"></Header>
		<view class="container">
			<u-dropdown height="68rpx" title-size="28rpx">
					<u-dropdown-item close="close(index)" v-model="value" :title="options[value].label" :options="options"></u-dropdown-item>
			</u-dropdown>
			<view class="subject-table">
				<u-table>
					<u-tr>
						<u-th :style="thStyle">学科</u-th>
						<u-th>成绩</u-th>
						<u-th>班级排名</u-th>
						<u-th>级部排名</u-th>
						<u-th>操作</u-th>
					</u-tr>
					<view  v-for="(item,i) in selectList[value].check" :key="i" >
						<u-tr class="u-tr">
							<u-td class="u-td" style="background-color: #ffedca;text-align: center;">
								<text style="color:#f4a509;">{{item.value}}</text>
								<image src="../../../static/images/icon-selected.png" style="width: 32rpx;height: 28rpx;display: inline;position: absolute;"></image>
							</u-td>
							<u-td style="background-color: #ffedca;"><text style="color:#f4a509;">--</text></u-td>
							<u-td style="background-color: #ffedca;"><text style="color:#f4a509;">--</text></u-td>
							<u-td style="background-color: #ffedca;"><text style="color:#f4a509;">--</text></u-td>
							<u-td style="background-color: #ffedca;"><text style="color:#f4a509;" @click="open(item.value)">删除</text></u-td>
						</u-tr>
					</view>
					<u-tr class="u-tr">
						<u-td class="u-td" style="background:#f1f9f8">可选列表</u-td>
						<u-td class="u-td"></u-td>
						<u-td class="u-td"></u-td>
						<u-td class="u-td"></u-td>
						<u-td class="u-td"></u-td>
					</u-tr> 
					<!-- 可选 -->
					<view @click="add(item)" v-for="(item,i) in optionalList" :key="i">
						<u-tr class="u-tr">
							<u-td class="u-td">{{item.value}}</u-td>
							<u-td><text style="color:#4a4a4a;">--</text></u-td>
							<u-td><text style="color:#f4a509;">--</text></u-td>
							<u-td><text style="color:#47c2b9;">--</text></u-td>
							<u-td></u-td>
						</u-tr>
					</view>
				</u-table>
			</view>
			<u-button :custom-style="customStyle" @click="courses" plain>保存分组选课结果</u-button>
			<u-modal v-model="show" :show-title='false' show-cancel-button='true' :content="content" border-radius="4rpx" @confirm="remove()"></u-modal>
		</view>
	</view>
</template>

<script>
	import Header from "../../../utils/header.vue";
	import Http from "../../../utils/http.js";
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				headTitle: "",
				parentid:null,
				optionalList:[],	//可选的列表
				AllList:[], 		//全部的列表
				selectList:[], 		//已选的列表
				value: 0,			//value 控制选择分组
				options: [],		//分组列表
				show: false,
				content: '确定删除',
				selectName:'',
				thStyle:{
					color: '#fff',
					backgroundColor:"#f4a509"
				},
				customStyle: {
					color: '#fff',
					backgroundColor:"#f4a509",
					height:"64rpx",
					fontSize:"28rpx"
				}
			}
		},
		methods:{
			open(value){ //modle 框
				this.show = true;
				this.selectName = value
				this.content = this.content+`'${value}'`;
			},
			courses(){  //保存
				this.$store.commit("addgrpList",this.selectList);
				uni.navigateBack({})
			},
			remove(){  //删除
				let value = this.selectName
				for(let item of this.selectList){
					if(item.id === this.options[this.value].id){
						for(let idx in item.check){
							if(item.check[idx].value === value){
								item.check.splice(idx,1)
							}
						}
					}
				}
				this.getGroupcheck();
			},
			add(item){  //添加
				for(let items of this.selectList){
					if(items.id === this.options[this.value].id){
						items.check.push({value:item.value,key:item.key,islock:false});
					}
				}
				this.getGroupcheck();
			},
			close(index){ //下拉关闭
				this.parentid = this.options[index].id
				console.log(this.parentid)
				this.getAllselection(this.groupcheck);
			},
			getAllselection(groupcheck){ //获取可选列表
				new Http().post("GetOptionalGroupDetailedInfo",{groupcheck:groupcheck,parentid:this.parentid})
					.then((data)=>{
						var [error,res] = data;
						if(res.data.Code === -1){
							this.errmsg = res.data.Error;
						}else{
							let result = res.data.result.info;
							if(groupcheck){
								this.optionalList = result;
							}else{
								this.AllList = result;
							}
						}
					})
			},
			getGroupcheck(){ //获取可选列表方法
				let groupList = [];
				for(let item of this.selectList){
					groupList.push({groupid:item.id,checkinfo:[...item.check]}) //可选列表数据入参
				}
				this.getAllselection(JSON.stringify(groupList));
			}
		},
		components: {
			Header
		},
		onLoad(option) {
			this.headTitle = option.title;
			this.parentid = option.id;
			this.getAllselection(null); //获取全部选课
			this.selectList =JSON.parse(JSON.stringify(this.$store.state.grpList)); //获取已选科目
			for(let index in this.selectList){
				this.options.push({value:index,label:this.selectList[index].name,id:this.selectList[index].id}); //下拉列表数据
				if(option.id === this.selectList[index].id){
					this.value = index;
				}
			}
			this.getGroupcheck();
		},
		computed:{
			...mapState(['grpList'])
		},
		onShow(){
			
		}
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
	}
	.u-dropdown__menu__item{
		border: 1px solid #f1f1f1;
	}
	.u-th{
		color: #333;
		height: 40px;
		line-height: 40px;
		background: #f1f9f8 !important;
		border-bottom: 2px solid #189e95 !important;
	}
	.u-td{
		height: 80rpx;
	}
</style>
<style lang="less" scoped>
	.content{
		.container{
			box-sizing: border-box;
			padding: 20rpx 28rpx 20rpx;
			background-color: #fff;
			.subject-table{
				margin-top: 20px;
				margin-bottom: 20px;
			}
		}
	}	
</style>