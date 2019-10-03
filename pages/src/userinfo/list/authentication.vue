<template>
	<view class="avatar_change" style="padding: 40upx">
		<!-- <view class="titlebox" >
			<view class="typetext">身份信息</view> 
			<view class="tis">请确保身份证信息真实有效，否则无法通过审核</view>
			<input v-model="name" class="inputext" placeholder='请输入您的真实姓名' />
		</view> 
		<view class="titlebox" >
			<input style="ime-mode: disabled;" v-model="idnumber" class="inputext" placeholder="请输入您的身份证号:" />
		</view> -->
		<!-- 	
		<view class="titlebox" >
			<view class="typetext">身份证照片</view> 
			<view class="tis">请上传身份证正反面高清照片</view>
			<view class="tis" style="color: red;">*切勿重复提交，提交前请仔细审核内容。</view>
		</view> -->
		<view class="user_avatar">
			<image :src="avatar_native" mode="" v-if="isShow"></image>
			<image :src="message.avatar" mode="" v-else></image>
		</view>
		<button type="primary" @tap="choose_img" class="choose_img">选择图片</button>
		<!-- <an-upload-img @func="getMsgFormSon" @funcs="getMsgFormSons"></an-upload-img> -->

		<view><button @tap="Submission" class="landing" type="primary">提交</button></view>
	</view>
</template>

<script>
	import service from '../../../../utils/httpRequest.js';
	import message from '../../../../service/message.js';
	import anUploadImg from '@/components/an-uploadImg/an-uploadImg';
	import {
		pathToBase64,
		base64ToPath
	} from '../../../../utils/base64.js'
	import httpRequst from '../../../../utils/httpRequest.js'

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
				avatar_native:null,
				isShow:false
			};
		},
		onLoad() {
			this.get_message();
			// console.log()
		},
		methods: {
			async get_message() {
				this.message = await message.get_message();
				console.log(this.message);
			},
			async Submission() {
				// if (this.name == null) {
				// 	plus.nativeUI.toast('请输入真实姓名！');
				// } else if (this.idnumber == null) {
				// 	plus.nativeUI.toast('请输入真实身份证号码！');
				// } else if (this.msgFormSon == null || this.msgFormSons == null) {
				// 	plus.nativeUI.toast('请上传身份证正反面照片！');
				// } else {
				// 	let data = JSON.parse(JSON.parse(plus.storage.getItem('storage')));
				// 	const query = {
				// 		id: data.id,
				// 		id_name: this.name,
				// 		id_card: this.idnumber,
				// 		id_card_front: this.msgFormSon,
				// 		id_card_back: this.msgFormSons
				// 	};
				// 	let res = await service.httpRequest('member/auth_set', query);
				// 	plus.nativeUI.toast(res.message);
				// 	console.log(JSON.stringify(res));
				// 	if (res.error_code == 0) {
				// 		uni.navigateBack({
				// 			delta: 1
				// 		});
				// 	}
				// }
				if (this.avatar_reset) {
					let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
					var query = {
						id: data.id,
						avatar: this.avatar_reset
					}
					this.res = await httpRequst.httpRequest('member/avatar_reset', query)
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
					}else{
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
								this.avatar_reset = base64;
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
		width: 200upx;
		height: 200upx;
		margin: auto;
	}

	.user_avatar image {
		width: 200upx;
		height: 200upx;
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
