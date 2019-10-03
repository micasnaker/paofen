<template>
	<view class="content">
		<view class="login-bg">
			<view class="login-card">
				<view style="margin-top: 60upx;padding-bottom: 80upx;">
					<view style="width: 257upx;margin: 0 auto;">
						<image src="../../static/logo.png" style="width: 257upx;height: 46upx;margin: 20upx 0;"></image>
					</view>
					<view class="login-head">{{phone.slice(0,3)+'****'+phone.slice(7,11)}}</view>
				</view>

				<input type="password"  @blur="focushand(1)" @focus="focushand(0)" :class="{focusInput:focuss==true}" v-model="password" placeholder="请输入密码" />
	
				<view class="login-function">
					<view class="login-register" @click="go_forget">忘记密码?</view>
				</view> 
			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @tap="go_home">登录</button>
		</view>
	</view>
</template> 

<script>
	import sign from '../../service/sign.js'
	export default {
		data() {
			return {
				phone:null,
				password:null,
				focuss:false,
				upLoadClicktag:0
			}
		},
		onLoad(option) {
			this.phone = option.phone
		},
		methods: {
			go_forget(){
				uni.navigateTo({
				    url: '../forget/forget'
				})
			},
			go_register(){
				uni.navigateTo({
					url: '../register/register'
				})
			},
			async go_home(){
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
					if(this.phone==null || this.password ==null){
						plus.nativeUI.toast('请输入账户密码')
					}else{ 
						await sign.get_sign(this.phone,this.password) 
					}
					setTimeout (()=>{
						this.upLoadClicktag = 0
					},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			},
			focushand(e){
				switch (e){
					case 0:
					this.focuss = true
						break;
					default:
					this.focuss = false
						break;
				}
			}
		}
	} 
</script>

<style>
	.landing{ 
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
	}
	.login-btn{
		padding: 10upx 20upx;
		margin-top: 100upx;
	}
	.login-function{ 
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	} 
	.login-register{
		color: #fff;
		float: right;
		font-size: 26upx;
	}
	input{
		border: #212a3c 1upx solid;
		color: #687c99;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 15upx;
		width: 90%;
		margin: 0 auto;
	}
	.login-margin-b{
		margin-bottom: 25upx;
	}
	.login-head{
		color: #fff;
		font-size: 34upx;
		text-align: center;
	}
	.login-card{
		position: relative;

	}
</style>
