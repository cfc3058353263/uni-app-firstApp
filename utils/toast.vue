<template>
	<view class="content">
		<u-toast ref="uToast"/>
	</view>
</template>

<script>
	export default {
		methods: {
			showToast(title,type,url) {
				this.$refs.uToast.show({
					title: title,
					type: type,
					url: url,
					position:'top',
					duration:"2000"
				})
			}
		},
		options: {  
		    styleIsolation: 'shared'  
		}  
	}
</script>

<style>
	.u-position-top{
		width:70% !important
	}
	.u-toast{
		width:70% !important
	}
</style>
<style lang="scss">
	.u-toast{
		width:70% !important
	}
</style>