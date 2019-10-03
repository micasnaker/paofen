<template>
	<view>
		<view style="margin-left: 20upx;">
			<view>钱包余额（USDT）</view>
			<view style="font-size: 48upx;font-weight: 400;">{{message.num}}</view>
		</view>
		<view class="titlenav">
			<view>请输入接单USDT数量</view>
			<input class="forget-input" type="number"  placeholder="数量必须为200-2000之间且为10的整数倍" v-model="num"/>
			<view>二级密码</view>
			<input class="forget-input" style="margin-top: 20upx;" type="password"  v-model="password" placeholder="二级密码" />
		</view>
		
		<view class="forget-btn" @tap="getRegiter">
			<button class="landing" type="primary">马上接单</button>
		</view>
	</view>
</template>

<script> 
	import service from '../../../utils/httpRequest.js'
	export default{
		data(){
			return {
				upLoadClicktag:0,
				num:null,
				password:null,
				message:null
			}
		},
		onLoad() {
			this.message = uni.getStorageSync('storage')
		},
		methods:{	
			async getRegiter(){
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
					if(this.num>=200||this.num<=2000){
						if(this.num%10==0){
							let data = uni.getStorageSync('storage')
							const query = {
								id:data.id, 
								num:this.num,
								password:this.password
							}
							this.res = await service.httpRequest('jiedan',query)
							plus.nativeUI.toast(this.res.message)
							console.log(this.res.error_code)
							if(this.res.error_code==0){
								uni.navigateBack({
									delta: 1
								})
							}
						}else{
							plus.nativeUI.alert('请输入10的整数倍')
						}
						
					}else{
						plus.nativeUI.alert('请输入正确的接单范围')
					}
					setTimeout (()=>{
							this.upLoadClicktag = 0
						},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			}
		}
	}
</script>

<style>
	.textnav{
		color: white;
		width: 25%;
		font-size: 30upx;
		text-align: center;
		margin-top: 60upx;
	}
	.textnav1{
		color: #349cfe; 
		font-size: 30upx;
		text-align: center;
	}
	
	.titlenav{
		width: 90%;
		background: #fff;
		border-radius: 30upx;
		margin: 20upx auto; 
		position: relative;
		margin: 3%;
		box-shadow: 0px 5px 15px #888888;
		padding: 40upx 20upx;
	}
	
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
	}
	.forget-btn{
		padding: 10upx 20upx;
		margin-top: 80upx;
	}
	
	.forget-input {
		border: #212a3c 1upx solid;
		color: #687c99;
		font-size: 28upx; 
		padding: 10upx 25upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 15upx;
	}
</style>
