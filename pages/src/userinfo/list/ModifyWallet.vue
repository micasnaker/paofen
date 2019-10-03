<template>
	<view style="padding: 40upx">
		<view class="titlebox" >
			<input v-model="used" type="password" class="inputext" placeholder="旧密码:" />
		</view> 
		<view class="titlebox" >
			<input v-model="news" type="password" class="inputext" placeholder="新密码:" />
		</view> 
		<view class="titlebox" >
			<input v-model="confirm" type="password" class="inputext" placeholder="确认新密码:" />
		</view> 
		<button @tap="get_changpassword" class="landing" type="primary">保存并使用</button>
	</view>
</template>

<script>
	import config from '../../../../utils/config.js'
	export default{
		data(){
			return{
				rechargeType: null,
				used:null,
				news:null,
				confirm:null
			}
		},
		methods:{
			get_changpassword(){
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				console.log(this.used)
				console.log(this.news)
				console.log(this.confirm)
				uni.request({
					url:config + 'member/wallet_pass_set',
					data:{
						id:data.id,
						qianbao_pass:this.used,
						qianbao_pass_new:this.news,
						qianbao_pass_new_again:this.confirm
					},
					header:{
						'token':data.token
					},
					method:'POST'
				})
				.then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
					var [error, res]  = data;
					if(res){
						console.log(res.data);
						plus.nativeUI.toast(res.data.message)
						
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
		color: #666;
		ime-mode: disabled;
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
