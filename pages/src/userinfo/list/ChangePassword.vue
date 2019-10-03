<template>
	<view style="padding: 40upx">
		<view class="title">
			请输入旧登录密码
		</view>
		<view class="titlebox" >
			<input type="password" v-model="old_pwd"  class="inputext" placeholder="旧密码:" />
		</view> 
		<view class="title">
			请输入新登录密码
		</view>
		<view class="titlebox" >
			<input type="password" v-model="new_pwd"  class="inputext" placeholder="新密码:" />
		</view> 
		<view class="title">
			请确认新登录密码
		</view>
		<view class="titlebox" >
			<input type="password" v-model="confirm_newPwd"  class="inputext" placeholder="确认新密码:" />
		</view> 
		<button @tap="get_changpassword" class="landing" type="primary">提交</button>
	</view>
</template>

<script>
	import config from '../../../../utils/config.js'
	export default{
		data(){
			return{
				rechargeType: null,
				old_pwd:null,
				new_pwd:null,
				confirm_newPwd:null
			}
		},
		methods:{
			get_changpassword(){
				if(this.old_pwd.length>=8&&this.new_pwd.length>=8&&this.confirm_newPwd.length>=8&&this.old_pwd.length<=18&&this.new_pwd.length<=18&&this.confirm_newPwd.length<=18){
					let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
					uni.request({
						url:config + 'member/password_reset',
						data:{
							id:data.id,
							pass:this.old_pwd,
							pass_new:this.new_pwd,
							pass_new_again:this.confirm_newPwd
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
								let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
								uni.reLaunch({
									url: '../../../login/login?phone='+data.phone,
								});
							}
						}else{
							console.log(error.data)
						}
					})
				}else if(this.new_pwd!=this.confirm_newPwd){
					plus.nativeUI.alert('两次密码不一致！')
				}
				else{
					plus.nativeUI.alert('密码必须为8-18位字符！')
				}
			}
		}
	}
</script>

<style>
	.title{
		margin-top: 20upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 15upx;
		font-size: 28upx;
		color: black;
		padding-left: 20upx;
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
