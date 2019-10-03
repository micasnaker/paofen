<template>
	<view class="content">
		<view class="forget-bg">
			<view class="forget-card">
				<view class="title" style="padding-left: 28upx;" v-if="message.qianbao_password == 1">
					输入初始二级密码(如忘记初始密码，可以联系客服重置密码！)
				</view>
				<view class="forget-input forget-margin-b" v-if="message.qianbao_password == 1">
					<input type="password" v-model="old" placeholder="初始二级密码" />
				</view>
				<view class="title" style="padding-left: 28upx;">
					输入新二级密码
				</view>
				<view class="forget-input forget-margin-b">
					<input type="password" v-model="news" placeholder="新二级密码" />
				</view>
				<view class="title" style="padding-left: 28upx;">
					确认新二级密码
				</view>
				<view class="forget-input">
					<input type="password" v-model="confirmnews" placeholder="确认新二级密码" />
				</view>
			</view>
		</view>
		<view @tap="get_find" class="forget-btn">
			<button class="landing" type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	import code from '../../service/code.js'
	import config from '../../utils/config.js'
	import httpRequst from '../../utils/httpRequest.js'
	import message from '../../service/message.js'
	export default {
		data() {
			return {
				rechargeType: null,
				code: null,
				news: null,
				message: null,
				old: null,
				confirmnews: null,
				phone: null,
				safety: {
					time: 60,
					state: false,
					interval: ''
				}
			}
		},
		onShow() {
			this.get_message()
		},
		methods: {
			async get_message() {
				this.message = await message.get_message()
			},
			get_find() {
				var data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				var that = this;
				if (this.message.qianbao_password == 0) {
					uni.request({
						url: config + 'member/wallet_pass_set',
						data: {
							id: data.id,
							// code:this.code,
							qianbao_pass_new: this.news,
							qianbao_pass_new_again: this.confirmnews
						},
						header: {
							'token': data.token
						},
						method: 'POST'
					}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						if (res) {
							console.log(res.data);
							plus.nativeUI.toast(res.data.message)
							if (res.data.error_code == 0) {
								uni.navigateBack({
									delta: 1
								})
							}
						} else {
							console.log(error.data)
						}
					})
				} else {
					uni.request({
						url: config + 'member/wallet_pass_find',
						data: {
							id: data.id,
							qianbao_pass: this.old,
							qianbao_pass_new: this.news,
							qianbao_pass_new_again: this.confirmnews
						},
						header: {
							'token': data.token
						},
						method: 'POST'
					}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						if (res) {
							console.log(res)
							plus.nativeUI.toast(res.data.message)
							if (res.data.error_code == 0) {
								uni.navigateBack({
									delta: 1
								})
							}
						} else {
							console.log(error.data)
						}
					})
				}
			}
		}
	}
</script>

<style>
	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left, #4286de, #5091e6);
		margin-top: 40upx;
	}

	.verify-btn {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 15upx;
		float: right;
	}

	.verify-left {
		width: calc(100% - 260upx);
	}

	.verify-right {
		padding-left: 20upx;
	}

	.verify-btn {
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 8upx;
		background: linear-gradient(left, #4286de, #5091e6);
	}

	.verify-left,
	.verify-right {
		float: left;
	}

	.forget-btn {
		padding: 10upx 20upx;
		margin-top: 260upx;
	}

	.forget-input input {
		border: #212a3c 1upx solid;
		font-size: 28upx;
		color: #666;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 15upx;
	}

	.forget-margin-b {
		margin-bottom: 25upx;
	}

	.forget-input {
		padding: 10upx 20upx;
		overflow: auto;
	}

	.forget-card {
		position: relative;

	}

	.forget-bg {
		height: 260upx;
		padding: 25upx;
	}
</style>
