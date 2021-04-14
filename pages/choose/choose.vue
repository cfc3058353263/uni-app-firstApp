<template>
	<view class="content">
		<Header :headTitle="headTitle"></Header>
		<scroll-view>
			<Module ref="module"></Module>
		</scroll-view>
	</view>
</template>

<script>
	import Header from "../../utils/header.vue";
	import Module from "./module";
	import Http from "../../utils/http.js";
	export default {
		data() {
			return {
				headTitle: ""
			}
		},
		components: {
			Header,
			Module
		},
		onLoad(option) {
			this.headTitle = option.title;
		},
		onShow(){
			this.$refs.module.notStartList = []
			this.$refs.module.startList = []
			this.$refs.module.endList = []
			this.$refs.module.getOptionalList()
		}
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
	}
</style>
