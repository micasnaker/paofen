<template>
	<view style="padding: 40upx">
		<view @tap="go_discount" style="float: right;text-decoration: underline;">提现记录</view>
		<view class="titlebox" >
			<view class="typetext">钱包地址：</view> 
			<input  class="inputext" v-model="message.qianbao" placeholder='请输入钱包地址' v-if="message.qianbao"/>
			<input  class="inputext" v-model="qianbao" placeholder='请输入钱包地址' v-else/>
		</view> 
		<view class="titlebox" >
			<view class="typetext">数量：</view> 
			<input type="number" v-model="num" class="inputext" placeholder="请输入转出数量" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">二级密码：</view> 
			<input type="password" v-model="password" class="inputext" placeholder="请输入二级密码" />
		</view> 
		<button @tap="get_conduct" class="landing" type="primary">确认</button>
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
				message:null,
				upLoadClicktag:0,
				tibi:null,
				qianbao:null,
				password:null
			}
		},
		onLoad() {
			this.get_message();
		},
		methods:{
			async get_message() {
				this.message = await message.get_message()
				// console.log(this.message)				
			},
			async get_conduct(){
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				if(this.message.qianbao){
					var query = {
						id:data.id,
						num:this.num,
						qianbao:this.message.qianbao,
						password:this.password
					}
				}else{
					var query = {
						id:data.id,
						num:this.num,
						qianbao:this.qianbao,
						password:this.password
					}
				}
				let res = await service.httpRequest('tixian',query)
				console.log(res)
				plus.nativeUI.toast(res.message)
				
				uni.navigateBack({
					delta: 1
				})
				setTimeout (()=>{
					this.upLoadClicktag = 0
						},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			},
			go_discount(){
				uni.navigateTo({
					url: 'DiscountRecord'
				})
			}
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
