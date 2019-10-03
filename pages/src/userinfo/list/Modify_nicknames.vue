<template>
	<view style="padding: 40upx">
		<view class="titlebox" >
			<input v-model="modify"  class="inputext" placeholder="修改昵称(不超过6个字符)" />
		</view> 
		<button @tap="get_modify" class="landing" type="primary">保存并使用</button>
	</view>
</template>

<script>
	import config from '../../../../utils/config.js'
	export default{
		data(){
			return{
				rechargeType: null,
				modify:null
			}
		},
		methods:{
			get_modify(){
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				uni.request({
					url:config + 'member/name_reset',
					data:{
						id:data.id,
						name:this.modify
					},
					header:{
						'token':data.token
					},
					method:'POST'
				}).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
					var [error, res]  = data;
					if(res){
						console.log(res.data);
						plus.nativeUI.alert(res.data.message)
						if(res.data.error_code == 0){
							uni.navigateBack({
								delta: 1
							})
						}
					}else{
						console.log(error.data)
					}
				})
			}
		}
	}
</script>

<style>
	.titlebox{
		margin-top: 40upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 15upx;
		font-size: 28upx;
		color: black;
	}
	.landing{ 
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
		margin-top: 40upx;
	}
</style>
