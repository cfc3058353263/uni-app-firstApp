<template>
	<view>
		<Header :headTitle="headTitle"></Header>
	</view>
</template>

<script>
	import Header from "../../utils/header.vue";
	export default {
		data(){
			return{
				headTitle:""
			}
		}, 
		components: {
			Header
		},
		onLoad(option) {
			this.headTitle = option.title
		}
	}
</script>

<style lang="scss">
	@import "../../static/css.scss";
	
</style>
