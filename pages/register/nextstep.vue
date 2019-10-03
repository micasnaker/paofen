<template>
	<view>
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input">
					<input placeholder="请输入昵称" v-model="name"/>
				</view>
				<view class="forget-input">
					<input  password="true" placeholder="请输入密码(8-18位)" v-model="password"/>
				</view>
				
				<view class="forget-input">
					<input  type="password"  placeholder="请输入确认密码(8-18位)" v-model="confirm"/>
				</view>
				<view class="forget-input">
					<input  type="password" placeholder="请设置钱包密码(8-18位)" v-model="qianbao"/>
				</view>
				<view class="forget-input forget-margin-b">
					<view class="verify-left">
						<input type="number" placeholder="请输入验证码" v-model="code" />
					</view>
					<view class="verify-right" @tap="!safety.state ? get_code():''">
						<button class="verify-btn" type="primary">{{!safety.state&&'获取验证码'||(safety.time+' s')}}</button>
					</view>
				</view>


				<view class="forget-input">
					<input class="noChinese" placeholder="请输入推荐码" v-model="p"/>
				</view>
			</view>
		</view>
		<view class="forget-btn" @tap="getRegiter">
			<button class="landing" type="primary">注册</button>
		</view>
	</view>
</template>

<script>
	import code from '../../service/code.js'
	import config from '../../utils/config.js'
	
	export default {
		data() {
			return {
				phone:'',
				password:null,
				code:null,
				p:null,
				name:null,
				confirm:null,
				qianbao:null,
				safety: {
					time: 60,
					state: false,
					interval: ''
				}
			}
		},
		onLoad(option) {
			this.phone = option.phone
		},
		methods: {
			async get_code(){
				if(/^1[3456789]\d{9}$/.test(this.phone)&&this.phone.length ==11){
					await code.get_code(this.phone,1)
					this.safety.state = true
					// 倒计时
					this.safety.interval = setInterval(() => {
					  if (this.safety.time-- <= 0 ) {
						this.safety.time = 60
						this.safety.state = false
						clearInterval(this.safety.interval)
					  }
					}, 1000)
				}else{
					plus.nativeUI.alert('请输入正确的手机号！')
				}
			},
			async getRegiter(){
				if(this.password==null&&this.confirm==null&&this.name==null&&this.qianbao==null&&this.code==null){
					plus.nativeUI.alert('请输入完整的注册信息!')
				}else if(this.password!=this.confirm){
					plus.nativeUI.alert('两次输入的密码不一致！')
				}else if(this.password.length>=8&&this.confirm.length>=8&&this.password.length<=18&&this.confirm.length<=18){
					uni.request({
						url:config+'register',
						data:{
							phone:this.phone,
							code:this.code,
							pass:this.password,
							pass_again:this.password,
							p:this.p,
							name:this.name,
							qianbao_password:this.qianbao
						},
						method:'POST',
						success: (res) => {
							plus.nativeUI.toast(res.data.message)
							//console.log(res.data)
							if(res.data.error_code==0){
								plus.nativeUI.toast(res.data.message)
								uni.reLaunch({
									url: '../verification-login'
								})
							}
						},
						fail: (error) => {
							console.log(error.data)
							plus.nativeUI.toast('网络出错啦！')
						}
					})
				}else{
					plus.nativeUI.alert('请输入正确的密码!')
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
		border-radius: 15upx;
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
		height: 62upx;
		line-height: 62upx;
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
		position: relative;
		margin-top: 40upx;
	}
</style>
