<template>
	<view>
		<!-- <view style="height: 60upx;line-height: 60upx;color: #4286de;margin: 20upx;font-size: 30upx;">个人信息</view> -->

		<!-- 		<view @tap="go_authentication" class="listnav">
			<image :src="message.avatar" style="width: 60upx;height: 60upx;"></image>
			<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view> -->
		<!-- 		<view class="listnav" @tap="go_modifyname">
			<text class="textnav">昵称</text>
			<view class="" style="float: right;">
				<text class="textnav">{{message.name}}</text>
				<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
			</view>
		</view> -->
		<view class="listnav">
			<text class="textnav">手机</text>
			<text style="float: right;margin-top: 8upx;">{{message.phone}}</text>
		</view>
		<view @tap="go_keystore" class="listnav">
			<text class="textnav">导出Keystore</text>
			<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_rememberKey" class="listnav">
			<text class="textnav">导出助记词</text>
			<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_au" class="listnav" v-if="message.is_auth !== 2">
			<text class="textnav">实名认证</text>
			<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" v-if="message.is_auth == 2">
			<text class="textnav">已实名认证</text>
			<image src="../../../static/paofen/right.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>

		<!-- 		<view style="height: 60upx;line-height: 60upx;color: #4286de;margin: 20upx;font-size: 30upx;">个人账户</view>
		<view @tap="go_bank" class="listnav">
			<text class="textnav" >银行卡绑定</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_weChat" class="listnav">
			<image src="../../../static/pay/wx.png" style="width: 38upx;height: 31upx;margin: 0 10upx;margin-top: 10upx;"></image>
			<text class="textnav" >微信</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view  @tap="go_Alipay" class="listnav" style="border-bottom: #1f2a3e solid 0.5upx;">
			<image src="../../../static/pay/aliy.png" style="width: 32upx;height: 32upx;margin: 0 10upx;margin-top: 9upx;"></image>
			<text class="textnav" >支付宝</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view> -->

		<!-- <view style="height: 60upx;line-height: 60upx;color: #4286de;margin: 20upx;font-size: 30upx;">安全设置</view>
		<view @tap="go_changepassword" class="listnav">
			<text class="textnav" >修改密码</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view  @tap="go_modifyWallet"  class="listnav">
			<text class="textnav" >修改钱包密码</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_findwallet" class="listnav">
			<text class="textnav" >找回钱包密码</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_walletaddress" class="listnav" style="border-bottom: #1f2a3e solid 0.5upx;">
			<text class="textnav" >绑定钱包地址</text>
			<image src="../../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view> -->
	</view>
</template>

<script>
	import message from '../../../service/message.js'
	export default {
		data() {
			return {
				message: null
			}
		},
		onLoad() {
			this.get_message()
		},
		methods: {
			async get_message() {
				this.message = await message.get_message()
			},
			go_bank() {
				uni.navigateTo({
					url: './list/bank'
				});
			},
			go_weChat() {
				uni.navigateTo({
					url: './list/weChat'
				});
			},
			go_au() {
				if (this.message.is_auth == 1) {
					uni.showToast({
						icon: "none",
						title: '实名认证审核中！'
					});
				} else if (this.message.is_auth == 2) {
					uni.showToast({
						icon: "none",
						title: '实名认证已通过'
					});
					uni.navigateTo({
						url: 'list/authentications'
					});
				} else if (this.message.is_auth == -1) {
					uni.showModal({
						title: '提示',
						content: '实名认证已驳回，需要重新认证吗？',
						success: res => {
							if (res.confirm) {
								// console.log('用户点击确定');
								uni.navigateTo({
									url: 'list/authentications'
								});
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else if (this.message.is_auth == 0) {
					uni.navigateTo({
						url: 'list/authentications'
					});
				}
			},
			go_Alipay() {
				uni.navigateTo({
					url: './list/Alipay'
				});
			},
			go_findwallet() {
				uni.navigateTo({
					url: './list/findwallet'
				});
			},
			go_modifyname() {
				uni.navigateTo({
					url: './list/Modify_nicknames'
				});
			},
			go_changepassword() {
				uni.navigateTo({
					url: './list/ChangePassword'
				});
			},
			go_modifyWallet() {
				uni.navigateTo({
					url: './list/ModifyWallet'
				});
			},
			go_walletaddress() {
				uni.navigateTo({
					url: './list/Walletaddress'
				});
			},

			go_keystore() {
				uni.navigateTo({
					url: './list/keyStore'
				});
			},
			go_rememberKey() {
				uni.navigateTo({
					url: './list/rememberKey'
				});
			},

			go_authentication() {
				// if(this.message.is_auth == 2){
				// 	plus.nativeUI.alert('您已认证！')
				// }else{
				// 	
				// }
				uni.navigateTo({
					url: './list/authentication'
				});
			}
		}
	}
</script>

<style>
	.listnav {
		margin: 0 auto;
		width: 88%;
		height: 50upx;
		border-top: #1f2a3e solid 0.5upx;
		line-height: 50upx;
		border-left: none;
		border-right: none;
		padding: 20upx;
	}

	.textnav {
		color: #687c99;
		font-size: 30upx;
		margin: 20upx 5upx;
	}
</style>
