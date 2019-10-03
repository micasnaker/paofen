<template>
	<view style="padding: 40upx">
		<view class="titlebox" >
			<input v-model="wechat"  class="inputext" :placeholder="message.weixin==null?'请输入微信账号':message.weixin"/>
		</view> 
		<button @tap="get_wechat" class="landing" type="primary">保存并使用</button>
		<view style="width: 162upx;height: 130upx;margin: 0 auto;margin-top: 90%;">
			<image src="../../../../static/pay/wx_pay.png" style="width: 162upx;height: 130upx;"></image>
		</view>
		
	</view>
</template>

<script>
	import message from '../../../../service/message.js'
	import config from '../../../../utils/config.js'
	export default{
		data(){
			return{
				rechargeType: null,
				wechat:null,
				message:null
			}
		},
		onLoad() {
			this.get_message()
		},
		methods:{
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
			},
			get_wechat(){
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				uni.request({
					url:config + 'member/weixin_set',
					data:{
						id:data.id,
						weixin:this.wechat
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
		color: #fff;
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
