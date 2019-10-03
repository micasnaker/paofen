<template>
	<view>
		<view class="forget-bg">
			<view class="forget-card">
				<image src="../static/paofen/logo.png" style="width: 257upx;height: 146upx;margin: 20upx 0;"></image>
				<view style="width: 25%;position: relative;margin: 20upx 0;" class="forget-input forget-margin-b">
					<input disabled type="number" placeholder="+86" />
					<image src="../static/img/san.png" style="width: 40upx;height: 40upx;float: right;margin-right: 20upx;margin-top: -35upx;"></image> 
				</view>
	
				<input class="forget-input" type="number" @blur="focushand(1)" @focus="focushand(0)" :class="{focusInput:focuss==true}" placeholder="请输入您的手机号" v-model="phone"/>
				<input class="forget-input" style="margin-top: 20upx;" type="password"  @blur="focushand(3)" @focus="focushand(2)" :class="{focusInput:focuss1==true}" v-model="password" placeholder="请输入密码" />
					
				<view class="login-function">
					<view  @click="go_forget">忘记密码?</view>
				</view>

			</view>
		</view>
		<view class="forget-btn" @tap="getRegiter">
			<button class="landing" type="primary">登录</button>
		</view>
	</view>
</template>

<script>
	import config from '../utils/config.js'
	export default {
		data() {
			return {
				phone:'',
				password:null, 
				code:null,
				p:null,
				name:null,
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				focuss:false,
				focuss1:false,
				upLoadClicktag:0
			}
		},
		onLoad() {

		},
		methods: {
			async getRegiter(){
				
				if(/^1[3456789]\d{9}$/.test(this.phone)&&this.phone.length ==11){
					if(this.upLoadClicktag==0){
						this.upLoadClicktag = 1
						
						uni.request({
							url:config+'login',
							data:{
								phone:this.phone,
								pass:this.password
							}, 
							method:'POST',
							success: (res) => {
								console.log(res.data)
								if(res.data.error_code ==0){
									uni.setStorageSync("storage",res.data.data)
									uni.reLaunch({
										url: 'bottom-nav/home'
									})
									
								}else{
									plus.nativeUI.alert(res.data.message)
								}
						
							},
							fail: (error) => {
								console.log(error.data)
								plus.nativeUI.alert('网络修复中，请稍后再试！')
							}
						})
						setTimeout (()=>{
							this.upLoadClicktag = 0
						},3000)
					}else{
						plus.nativeUI.alert('请勿频繁操作！')
					}

				}else{
					plus.nativeUI.alert('请输入正确的手机号！')
				}
			},
			focushand(e){
				switch (e){
					case 0:
					this.focuss = true
						break;
					case 1:
					this.focuss = false
						break;
					case 2:
					this.focuss1 = true
						break;
					case 3:
					this.focuss1 = false
						break
				}
			},
			go_forget(){
				uni.navigateTo({
				    url: 'forget/forget'
				})
			},

		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.verify-left{
		width: calc(100% - 260upx);
	}
	.verify-right{
		padding-left: 20upx;
	}
	.verify-btn{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 8upx;
		background: linear-gradient(left,#FF978D, #FFBB69);
	}
	.verify-left,.verify-right{
		float: left;
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
	.forget-input input::-ms-input-placeholder{
		color: #007AFF;
	}
	.forget-margin-b{
		margin-bottom: 25upx;
	}
	.forget-input{
		overflow: auto;
	}
	.forget-card{
		border-radius: 12upx;
		position: relative;
		padding: 20upx 25upx;
	}
	
	.login-function{ 
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	} 
	
	.login-btn{
		padding: 10upx 20upx;
		margin-top: 100upx;
	}
</style>
