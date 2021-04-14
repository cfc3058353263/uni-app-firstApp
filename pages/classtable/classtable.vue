<template>
	<view class="content">
		<Header :headTitle="headTitle"></Header>
		<Module></Module>
	</view>
</template>

<script>
	import Header from "../../utils/header.vue";
	import Module from "./module.vue"
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
		}
	}
</script>
<style>
	page {
		background-color: #f4f4f4;
	}
</style>
