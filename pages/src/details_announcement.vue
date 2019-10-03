<template>
	<view>
		<view class="title">{{list.title}}</view>
		<view class="nav">{{list.content}}</view>
		<view class="tab">
			<view>CMP运营团队</view>
			<view>{{list.updated_at}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:null
			}
		},
		onLoad(options) {
			this.list = JSON.parse(options.data)
		}
	}
</script>

<style>
	.title{
		height: 80upx;	
		margin-top: 60upx;
		color: #349cfe;
		padding: 0 40upx;
	}
	.nav{
		padding:0 40upx;
		margin-top: 20upx;
		color: #fff;
	}
	.tab{
		height: 200upx;
		margin-top: 20upx;
		width: 30%;
		float: right;
		color: #fff;
	}
</style>
