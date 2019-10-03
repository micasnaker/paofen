<template>
	<view>
		<view class="titlenav">
			<view style="display: flex;margin-top: 40upx;height: 200upx;">
				<!-- <view class="" style="width: 160upx;height: 160upx;">
					<image :src="message.avatar" style="width: 160upx;height: 160upx;border-radius: 50%;background: white;margin-top: 20upx;margin-left: 40upx;"></image>
				</view> -->
				<view style="padding-left: 60upx;height: 160upx;margin-top: 50upx;">
					<!-- <view class="username">账号:{{ message.phone }}</view> -->
					<view>
						<!-- 	<view class="username" style="margin: 10upx 0;">用户ID:{{ message.tid }}</view>
						<view @tap="go_authentication" class="Real_name" :class="{ active: message.is_auth == 2 }" style="position: absolute;margin-top: -60upx;">
							{{ message.is_auth == 2 ? '已认证' : '未认证' }}
						</view> -->
					</view>
					<view class="username">账号:{{ message.phone }}</view>
					<view class="phone_wrap">
						<view class="phone_tag" v-if="message.is_auth==2">实名认证:{{ message.id_name }}</view>
						<view @tap="goShiming" class="phone_tag" v-else>实名认证：未实名</view>
						<image src="../../static/paofen/weixin.png" mode="" @tap="weixin_img"></image>
						<image src="../../static/paofen/zhifubao.png" mode="" @tap="zhifubao_img"></image>
					</view>

				</view>
				<view @tap="go_notafication" style="float: right;padding-left: 10upx;margin-top: 20upx;">
					<image style="width: 35upx;height: 42upx;" src="../../static/paofen/xiaoxi.png"></image>
					<view v-if="state" style="width: 15upx;height: 15upx;background: red;border-radius: 15upx;float: right;"></view>
				</view>
			</view>
			<view style="display: flex;margin-top: 40upx;">
				<!-- <view @click="scan" class="float">
					<image src="../../static/icon/icon_qr.png" class="icon"></image>
					<view class="textnav3">扫一扫</view>
				</view> -->
				<view @tap="go_code" class="float">
					<image src="../../static/paofen/zhuce.png" class="icon"></image>
					<view class="textnav3">好友注册</view>
				</view>
				<!-- <view @tap="go_comments" class="float">
					<image src="../../static/paofen/liuyan.png" class="icon"></image>
					<view class="textnav3">留言反馈</view>
				</view> -->
				<view @tap="go_wallet" class="float">
					<image src="../../static/paofen/wenti.png" class="icon"></image>
					<view class="textnav3">常见问题</view>
				</view>
			</view>
		</view>

		<view style="margin-top: 50upx;">
			<view @tap="go_userinfo" class="listnav" style="margin-top: 40upx;">
				<image src="../../static/paofen/ziliao.png" style="float: left;width: 34upx;height: 36upx;"></image>
				<text class="textnav">个人资料</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
			<view @tap="go_usdtDress" class="listnav">
				<image src="../../static/paofen/dizhi.png" style="float: left;width: 29upx;height: 36upx;"></image>
				<text class="textnav">我的USDT收货地址</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
			<view @tap="go_accounts" class="listnav">
				<image src="../../static/paofen/qianbao.png" style="margin-top: 7upx;float: left;width: 32upx;height: 28upx;"></image>
				<text class="textnav">资产钱包管理</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
			<view @tap="go_changepassword" class="listnav">
				<image src="../../static/paofen/denglu.png" style="margin-top: 5upx;float: left;width: 30upx;height: 30upx;"></image>
				<text class="textnav">登录密码</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
			<view @tap="go_secondPwd" class="listnav">
				<image src="../../static/paofen/erji.png" style="margin-top: 2upx;float: left;width: 29upx;height: 34upx;"></image>
				<text class="textnav">二级密码</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
			<view @tap="go_logout" class="listnav" style="border-bottom: rgba(223,223,223,1) solid 0.5upx;">
				<image src="../../static/paofen/logout.png" style="margin-top: 5upx;float: left;width: 30upx;height: 30upx;"></image>
				<text class="textnav">更换账号</text>
				<image src="../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import message from '../../service/message.js';
	import modalView from '../../components/x-modal/x-modal.vue';
	import QR from '../../utils/wxqrcode.js';
	import service from '../../utils/httpRequest.js';

	export default {
		components: {
			modalView
		},
		data() {
			return {
				message: null,
				codeurl: '',
				state: false
			};
		},
		onShow() {
			this.get_message();
			this.isread();
		},
		methods: {
			go_notafication() {
				uni.navigateTo({
					url: '../src/notification'
				});
			},
			async isread() {
				let data = JSON.parse(JSON.parse(plus.storage.getItem('storage')));

				const query = {
					id: data.id
				};
				let res = await service.httpRequest('have_new_notices', query);
				// console.log(JSON.stringify(res)+"res")
				if (res.data.status == 1) {
					this.state = true;
				} else {
					this.state = false;
				}
			},
			async get_message() {
				this.message = await message.get_message();
				// console.log(this.message+"用户信息");
			},
			go_authentication() {
				if (this.message.is_auth == 2) {
					plus.nativeUI.alert('您已认证！');
				} else {
					uni.navigateTo({
						url: '../src/userinfo/list/authentication'
					});
				}
			},
			islogo() {
				let data = JSON.parse(JSON.parse(plus.storage.getItem('storage')));
				if (data == null || data == '' || data == 'undefined') {
					uni.reLaunch({
						url: '../verification-login'
					});
				}
			},
			go_comments() {
				uni.navigateTo({
					url: '../src/userinfo/list/comments'
				});
			},
			goShiming(){
				uni.navigateTo({
					url: '../src/userinfo/list/authentications'
				});
			},
			go_wallet() {
				uni.navigateTo({
					url: '../src/problem_com'
				});
			},
			go_mysubordinate() {
				uni.navigateTo({
					url: '../src/userinfo/list/my_subordinate'
				});
			},
			go_myteam() {
				uni.navigateTo({
					url: '../src/userinfo/list/my_team'
				});
			},
			go_userinfo() {
				uni.navigateTo({
					url: '../src/userinfo/userinfo'
				});
			},
			go_changepassword() {
				uni.navigateTo({
					url: '../src/userinfo/list/ChangePassword'
				});
			},
			go_accounts() {
				// uni.navigateTo({
				// 	url: '../src/walletList/accounts'
				// });
				if (this.message.is_auth == 2) {
					uni.navigateTo({
						url: '../src/walletList/accounts'
					});
				} else if (this.message.is_auth == 1) {
					uni.showModal({
						title: '提示',
						content: '您的实名认证未成功，需要重新提交申请吗？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../src/userinfo/list/authentications'
								});
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '请先完成用户实名认证',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '../src/userinfo/list/authentications'
								});
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				}
			},
			getcodeurl() {
				this.codeurl = QR.createQrCodeImg(this.message.yaoqing, {
					size: parseInt(300) //二维码大小
				});
			},
			openCode() {
				plus.nativeUI.alert('此功能暂未开放！');
			},
			go_myfinancial() {
				uni.navigateTo({
					url: '../src/myfinancial'
				});
			},
			go_usdtDress() {
				uni.navigateTo({
					url: '../src/usdt_dress'
				});
			},
			go_islogin() {
				uni.navigateTo({
					url: '../verification-login'
				});
			},
			go_code() {
				uni.navigateTo({
					url: '../register/nextsteps'
				});
			},
			go_logout() {
				uni.navigateTo({
					url: '../logout/logout/logout'
				});
			},
			go_secondPwd() {
				uni.navigateTo({
					url: '../src/secondLevelPwd'
				});
				// uni.showToast({
				// 	icon: "none",
				// 	title: '请联系客服!'
				// });
			},
			scan() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						//plus.nativeUI.alert('条码类型：' + res.scanType+'---条码内容：' + res.result);
						console.log(res.result);
						if (res.result.length > 8) {
							uni.navigateTo({
								url: '../src/walletList/account?codeurl=' + res.result
							});
						}
					}
				});
			},
			weixin_img() {
				let payType = 1;
				uni.navigateTo({
					url: '../src/shoukuan?type=' + payType
				});
			},
			zhifubao_img() {
				let payType = 2;
				uni.navigateTo({
					url: '../src/shoukuan?type=' + payType
				});
			}
		}
	};
</script>

<style>
	.Real_name {
		height: 46upx;
		border: #687c99 solid 3upx;
		margin-left: 250upx;
		border-radius: 25upx;
		line-height: 46upx;
		color: #687c99;
		padding: 0 15upx;
		font-size: 28upx;
	}

	.active {
		border: #7ce2f5 solid 3upx;
		color: #7ce2f5;
	}

	.titlenav {
		width: 94%;
		background: #fff;
		border-radius: 30upx;
		margin: 20upx auto; 
		position: relative;
		margin: 3%;
		box-shadow: 0px 3px 10px #888888;
	}

	.float {
		width: 40%;
		margin: 13upx;
		padding: 20upx;
		position: relative;
	}

	.textnav {
		color: #687c99;
		font-size: 30upx;
		padding-left: 20upx;
	}

	.textnav3 {
		color: #687c99;
		font-size: 28upx;
		margin-top: 80upx;
		text-align: center;
	}

	.username {
		width: 372upx;
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(1, 10, 17, 1);
		/* padding-top: 30upx; */
	}

	.listnav {
		margin: auto;
		width: 88%;
		height: 40upx;
		border-top: rgba(223, 223, 223, 1) solid 0.5upx;
		line-height: 40upx;
		border-left: none;
		border-right: none;
		padding: 20upx;
	}

	.icon {
		width: 65upx;
		height: 60upx;
		position: absolute;
		left: 50%;
		margin-left: -32upx;
	}

	.login-btn {
		padding: 10upx 20upx;
		margin-top: 50upx;
	}

	.landing {
		width: 50%;
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left, #4286de, #5091e6);
	}

	.phone_wrap {
		display: flex;
		height: 50upx;
		line-height: 50upx;
		width: 460upx;
	}

	.phone_tag {
		width: 380upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	.phone_wrap image {
		width: 34upx;
		height: 28upx;
		margin-left: 30upx;
		margin-top: 10upx;
	}
</style>
