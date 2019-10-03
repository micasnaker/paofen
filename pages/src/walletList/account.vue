<template>
	<view style="padding: 40upx">
		<view @tap="go_transferrecord" style="float: right;text-decoration: underline;">转账记录</view>
		<view class="titlebox" >
			<view class="typetext">对方手机号：</view> 
			<input  class="inputext" placeholder='请输入对方手机号' v-model="phone"/>
		</view> 
		<view class="titlebox" >
			<view class="typetext">数量：</view> 
			<input type="number" v-model="num" class="inputext" placeholder="请输入转出数量" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">二级密码：</view> 
			<input type="password" v-model="password" class="inputext" placeholder="请输入二级密码" />
		</view> 
		<button @tap="get_acounts" class="landing" type="primary">确认</button>
	</view>
</template>

<script>
	import service from '../../../utils/httpRequest.js'
	import message from '../../../service/message.js'
	export default{
		data(){
			return {
				res:[],
				num:null,
				password:null,
				codeurl:null,
				upLoadClicktag:0,
				phone:null
			}
		},
		onLoad(option) {
			
			this.codeurl = option.codeurl+"="
		},
		onShow() {

		},
		methods:{
			async get_acounts(){
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
					let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
					const query = {
						id:data.id, 
						num:this.num,
						phone:this.phone,
						password:this.password
					}
					console.log(query)
					this.res = await service.httpRequest('zhuan',query)
					plus.nativeUI.toast(this.res.message)
					console.log(JSON.stringify(this.res))
						if(this.res.error_code==0){
							uni.navigateBack({
								delta: 1
							})
						}
					setTimeout (()=>{
							this.upLoadClicktag = 0
						},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			},
			go_transferrecord(){
				uni.navigateTo({
					url: 'Transferrecord'
				})
			},
		}
	}
</script>

<style>
	.typetext{
		color: #349cfe;
		font-size: 30upx;
	}
	.titlebox{
		margin-top: 20upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 20upx;
		font-size: 28upx;
		color: #000;
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
