<template>
	<view class="avatar_change" style="padding: 40upx">
		<view class="user_avatar" v-if="payType==1">
			<image :src="avatar_native" mode="" v-if="isShow"></image>
			<image :src="message.weixin_img" mode="" v-else></image>
		</view>
		<view class="user_avatar" v-if="payType==2">
			<image :src="avatar_native" mode="" v-if="isShow"></image>
			<image :src="message.zhifubao_img" mode="" v-else></image>
		</view>
		<view class="" v-if="payType==1">
			<button type="primary" @tap="choose_img" class="choose_img" v-if="message.weixin_img==null">选择收款码</button>
			<button type="primary" @tap="choose_img" class="choose_img" v-else>修改收款码</button>
		</view>
		<view class="" v-if="payType==2">
			<button type="primary" @tap="choose_img" class="choose_img" v-if="message.zhifubao_img==null">选择收款码</button>
			<button type="primary" @tap="choose_img" class="choose_img" v-else>修改收款码</button>
		</view>
		<!-- <an-upload-img @func="getMsgFormSon" @funcs="getMsgFormSons"></an-upload-img> -->

		<view><button @tap="Submission" class="landing" type="primary">提交</button></view>
	</view>
</template>

<script>
	import service from '../../utils/httpRequest.js';
	import message from '../../service/message.js';
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
	import {
		pathToBase64,
		base64ToPath
	} from '../../utils/base64.js'
	import httpRequst from '../../utils/httpRequest.js'

	export default {
		components: {
			anUploadImg
		},
		data() {
			return {
				num: null,
				password: null,
				message: null,
				idnumber: null,
				name: null,
				msgFormSon: null,
				msgFormSons: null,
				avatar_reset: null,
				avatar_native: null,
				isShow: false,
				payType: null,
				shoukuan_img: null
			};
		},
		onLoad(option) {
			this.get_message();
			// console.log()
			this.payType = option.type;
			console.log(this.payType)
		},
		methods: {
			async get_message() {
				this.message = await message.get_message();
				console.log(this.message);
			},
			async Submission() {
				if (!this.message.weixin_img || !this.message.zhifubao_img) {
					let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
					var query = {
						id: data.id,
						type: this.payType,
						shoukuan_qcode: this.shoukuan_img
					}
					this.res = await httpRequst.httpRequest('member/shoukuan_qcode', query)
					console.log(JSON.stringify(this.res) + "res!!!")
					if (this.res.error_code == 0) {
						this.get_message();
						uni.showToast({
							title: this.res.message,
							duration: 2000
						})
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: this.res.message,
							duration: 2000
						})
					}
				}
			},
			getMsgFormSon(data) {
				this.msgFormSon = data;
				console.log(this.msgFormSon);
			},
			getMsgFormSons(data) {
				this.msgFormSons = data;
				console.log(this.msgFormSons);
			},
			choose_img() {
				let id = uni.getStorageSync('user').id
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: (res) => {
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								// console.log(base64)
								// this.avatar_reset = res.tempFilePaths[0]
								this.isShow = true;
								this.avatar_native = res.tempFilePaths[0];
								this.shoukuan_img = base64;
							})
					}
				})
			},
		}
	};
</script>

<style>
	.tis {
		font-size: 24upx;
		color: #4286de;
	}

	.phonebox {
		width: 45%;
		height: 200upx;
		background: #13213d;
		margin: 20upx;
		border: #4286de solid 2upx;
		border-radius: 15upx;
		text-align: center;
	}

	.typetext {
		color: #687c99;
		font-size: 30upx;
	}

	.titlebox {
		margin-top: 50upx;
	}

	.inputext {
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 20upx;
		font-size: 28upx;
		color: #fff;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left, #4286de, #5091e6);
		margin-top: 100upx;
	}

	.user_avatar {
		width: 450upx;
		height: 450upx;
		margin: auto;
	}

	.user_avatar image {
		width: 450upx;
		height: 450upx;
	}

	.avatar_change {
		height: 600upx;
		width: 88%;
		margin: auto;
		box-shadow: 0px 14px 18px 0px rgba(183, 183, 183, 0.2);
	}

	.choose_img {
		width: 200upx;
		height: 80upx;
		background-color: #1AAD19;
		margin: auto;
		margin-top: 80upx;
	}
</style>
