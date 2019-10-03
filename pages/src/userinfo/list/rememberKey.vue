<template>
	<view class="logout">
		<view class="logout_head">导出下载备份助记词(remember_14786.key)</view>
		<view class="login-btn"><button class="landing" type="primary" @tap="go_login">下载备份</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		go_login() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录？',
				success: showResult => {
					if (showResult.confirm) {
						try {
							uni.clearStorageSync('storage');
							uni.reLaunch({
								url: '../verification-login'
							});
						} catch (e) {
							//plus.nativeUI.toast('本地存储删除失败！')
						}
					}
				}
			});
		},
	}
};
</script>

<style>
.logout {
	width: 88%;
	margin: auto;
	background-color: #fff;
	height: 400upx;
	border-radius: 20upx;
	margin-top: 30upx;
	box-shadow: 0px 14px 18px 0px rgba(183, 183, 183, 0.2);
}

.logout_head {
	padding-top: 30upx;
	padding-left: 20upx;
}

.landing {
	border-radius: 50upx;
	width: 88%;
	margin: auto;
	background-color: #0189ff;
	margin-top: 100upx;
	letter-spacing: 12upx;
}
</style>
