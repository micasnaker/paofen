<template>
	<view class="content"> 
		<!-- <view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input forget-margin-b">
					<input @blur="focushand(1)" @focus="focushand(0)" :class="{focusInput:focuss==true}" v-model="phone" type="number" placeholder="请输入您的手机号" />
				</view>
				<view class="forget-input forget-margin-b">
					<view class="verify-left">
						<input @blur="focushand(3)" @focus="focushand(2)" :class="{focusInput:focuss1==true}" v-model="code" type="number" placeholder="请输入验证码" />
					</view>
					<view  class="verify-right" @tap="!safety.state ? get_code():''">
						<button class="verify-btn" type="primary">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</button>
					</view>
				</view>
				<view class="forget-input">
					<input  @blur="focushand(5)" @focus="focushand(4)" :class="{focusInput:focuss2==true}" v-model="password" type="password" placeholder="请输入密码(8-16位)" />
				</view>
			</view>
		</view>
		<view @tap="forget" class="forget-btn">
			<button class="landing" type="primary">提交</button>
		</view> -->
		<view class="" style="width: 90%; margin: auto; text-align: center;font-size: 50upx;">
			请联系客服XXX重置密码！
		</view>
	</view>
</template>

<script>
	import code from '../../service/code.js'
	import config from '../../utils/config.js'
	
	export default {
		data() {
			return {
				phone:null,
				password:null, 
				code:null,
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				focuss:false,
				focuss1:false,
				focuss2:false
			}
		},
		onLoad() {

		},
		methods: {
			async get_code(){
				if(/^1[3456789]\d{9}$/.test(this.phone)&&this.phone.length == 11){				
					await code.get_code(this.phone,2)
					this.safety.state = true;
					// 倒计时
					this.safety.interval = setInterval(() => {
					  if (this.safety.time-- <= 0 ) {
						this.safety.time = 60;
						this.safety.state = false;
						clearInterval(this.safety.interval);
					  }
					}, 1000);
				}else{
					plus.nativeUI.alert('请输入正确的手机号！')
				}

			},
			forget(){
				if(this.phone==null||this.code==null||this.password==null||this.phone.length!=11){
					plus.nativeUI.alert('请输入完整的注册信息！')
				}else{ 
					uni.request({
						url:config+'password_find',
						data:{
							phone:this.phone,
							code:this.code,
							pass:this.password
						},
						method:'POST', 
						success: (res) => {
							console.log(res.data);
							plus.nativeUI.toast(res.data.message);
							if(res.data.error_code == 0){
								uni.reLaunch({
									url: '../verification-login'
								});
							}
						},
						fail: (error) => { 
							console.log(error.data);
						}
					})
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
						break;
					case 4:
					this.focuss2 = true
						break;
					case 5:
					this.focuss2 = false
						break;
				}
			}
		}
	}
</script>

<style>
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
		background: linear-gradient(left,#4286de, #5091e6);
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
		margin-top: 100upx;
	}

	.forget-input input{
		border: #212a3c 1upx solid;
		color: #687c99;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 15upx;
	}
	.forget-margin-b{
		margin-bottom: 25upx;
	}
	.forget-input{
		padding: 10upx 20upx;
		overflow: auto;
	}
	.forget-card{
		padding: 60upx 25upx;
		position: relative;

	}
	.forget-bg {

	}
</style>
