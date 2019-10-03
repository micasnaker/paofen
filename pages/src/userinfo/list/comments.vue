<template>
	<view class="avatar_change" style="padding: 40upx">
		<view class="title" style="display: flex;justify-content: space-between;">
			<view class="">
				问题类型
			</view>
			<view class="myComments" @tap="myComment">
				<image src="../../../../static/paofen/liuyan.png" mode="" style="margin-top: 12upx;float: left;width: 30upx;height: 38upx;"></image>
				<text style="float: right;">我的留言</text>
			</view>
		</view>
		<view class="titlebox">
			<picker @change="bindPickerChange" :value="index" :range="array">
				<input disabled :placeholder="rechargeType" style="padding-left: 20upx;border: #212a3c 1upx solid;border-radius: 15upx;height: 80upx;margin-top: 15upx;" />
				<image style="width: 30upx;height: 30upx;float: right;margin-top: -50upx;margin-right: 20upx;" src="../../../../static/img/triangle.png"></image>
			</picker>
		</view>
		<view class="title" style="padding-top: 30upx;">
			问题描述
		</view>
		<view class="qs_content">
			<textarea value="" placeholder="请输入您的反馈内容" v-model="qs_content" />
			</view>
			
		<view class="user_avatar" v-if="img_content">
			<image :src="img_content" mode=""></image>
		</view>

		<view class="an-img-add" @tap="choose_img" v-else>
			<uni-icon type="plusempty" size="42" color="#4286de" style="color: #4286de;font-size: 52upx;">+</uni-icon>
		</view>
		
		<view class="btn_sub">
			<button @click="Submission" class="landing" type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '../../../../utils/httpRequest.js';
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import message from '../../../../service/message.js';
	import {
		pathToBase64,
		base64ToPath
	} from '../../../../utils/base64.js'
	import httpRequst from '../../../../utils/httpRequest.js'

	export default {
		components: {
			uniIcon
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
				qs_content:null,
				img_content: null,
				type:1,
				rechargeType: '意见或建议',
				array: [
					'意见或建议',
					'信息咨询',
					'平台问题',
					'投诉举报',
				],
			};
		},
		onLoad() {
			this.get_message();
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
				switch(this.rechargeType){
					case '信息咨询':
					this.type = 2
					break;
					case '平台问题':
					this.type = 3
					break;
					case '投诉举报':
					this.type = 4
					break;
					default:
					this.type = 1
				}
					let data = JSON.parse(JSON.parse(plus.storage.getItem('storage')));
					if(this.qs_content == null){
						uni.showToast({
							icon:"loading",
							duration: 2000,
							title:"请填写反馈内容"
						})
					}else if(this.img_content == null){
						uni.showToast({
							icon:"loading",
							duration: 2000,
							title:"请上传图片"
						})
					}else{
						// console.log(this.msgFormSon)
						let query = {
							id: data.id,
							type:this.type,
							ask:this.qs_content,
							img:this.img_content
						};
						let res = await service.httpRequest('member/comments', query);
						console.log(JSON.stringify(res))
						if(res.error_code == 0){
							uni.showToast({
								icon:"success",
								title:res.message
							})
							uni.navigateBack({
								delta: 1
							});
						}else{
							uni.showToast({
								icon:"none",
								title:res.message
							})
						}
					}
				
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
								// this.img_content = base64
								this.img_content = res.tempFilePaths[0]
							})
					}
				})
			},
			bindPickerChange: function(e) {
				this.rechargeType = this.array[e.target.value]
			},
			getMsgFormSon(data) {
				this.msgFormSon = data;
				console.log(this.msgFormSon);
			},
			getMsgFormSons(data) {
				this.msgFormSons = data;
				console.log(this.msgFormSons);
			},
			myComment(){
				uni.navigateTo({
					url: './myComments'
				});
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
	},
	
	.an-img-add{
		float: left; 
		height: 200upx; 
		width: 300upx; 
		border: #4286de solid 1upx;
		background: #13213d;
		text-align: center; 
		line-height: 200upx;
	}
	.an-img-add2{
		height: 200upx; 
		width: 300upx; 
		border: #4286de solid 1upx;
		position: absolute;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left, #4286de, #5091e6);
		margin-top: 60upx;
	}

	.user_avatar {
		float: left; 
		height: 200upx; 
		width: 300upx; 
		background: #13213d;
		text-align: center; 
		line-height: 200upx;
	}

	.user_avatar image {
		height: 200upx; 
		width: 300upx; 
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
	
	.qs_content{
		width: 100%;
		margin: auto;
	}
	
	.btn_sub{
		width: 100%;
		margin: auto;
		margin-top: 260upx;
	}
	
	.myComments{
		height: 60upx;
		width: 100px;
		line-height: 60upx;
	}
</style>
