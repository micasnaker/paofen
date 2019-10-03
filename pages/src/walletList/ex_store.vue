<template>
	<view class="">
		<view class="store" style="width: 90%;margin: auto;box-shadow: 0px 5px 15px #888888;margin-top: 50upx;border-radius: 30upx;">
			<view class="" style="margin: auto;width: 90%;text-align: center;padding-top: 30upx;color: red;">
				备份提示
			</view>
			<view style="color: black;width: 90%;padding-top: 20upx;padding-left: 20upx;">获得私钥等于获得钱包资产的所有权</view>
			<view style="color: black;width: 90%;padding-top: 20upx;padding-left: 20upx;padding-bottom: 30upx;">请妥善保管至脱离网络的安全地方</view>
		</view>
		<view class="store" style="width: 90%;margin: auto;box-shadow: 0px 5px 15px #888888;margin-top: 50upx;text-align: center;border-radius: 30upx;">
			<view class="" style="margin: auto;width: 90%;text-align: center;padding-top: 30upx;">
				您的私钥
			</view>
			<view style="color: black;width: 90%;padding-top: 20upx;margin: auto;padding-bottom: 10upx;">sfkadsjfopkncvklmdpfknpeonf</view>
		</view>
		<button type="primary" @click="copy_store(store_url)" style="width: 90%;margin: auto;border-radius: 30upx;margin-top: 60upx;">复制私钥</button>
	</view>
</template>

<script>
	import service from '../../../utils/httpRequest.js'
	import message from '../../../service/message.js'
	export default {
		data() {
			return {
				res: [],
				num: null,
				password: null,
				message: null,
				codeurl: '',
				upLoadClicktag: 0,
				store_url: 'dasdaonfosdnvopnameo'
			}
		},
		onLoad(option) {
			this.get_message()
		},
		methods: {
			async get_message() {
				this.message = await message.get_message()
				console.log(this.message)
			},
			// 复制私钥
			copy_store(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style>
	.wallet {
		width: 100%;
		height: 100%;
	}

	.bg {
		width: 90%;
		height: 300upx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		margin: 0 auto;
		z-index: 1;
		text-align: center;
	}

	.zc_wallet {
		width: 90%;
		text-align: center;
		position: absolute;
		z-index: 2;
		left: 0;
		right: 0;
		top: 0;
		margin: 0 auto;
		padding-top: 60upx;
		color: #FFFFFF;
	}

	.usdt_num {
		padding-top: 30upx;
		font-size: 50upx;
		color: #FFFFFF;
	}

	.wallet_pwd {
		padding-top: 350upx;
		width: 90%;
		margin: auto;
	}

	.wallet_input {
		border: 1px solid #ccc;
		border-radius: 30upx;
		text-align: left;
		padding-left: 20upx;
		margin-top: 20upx;
		height: 60upx;
		line-height: 60upx;
	}
</style>
