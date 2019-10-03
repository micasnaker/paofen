<template>
	<view style="padding: 40upx">
		<view class="usdt_text">
			USDT钱包只能向USDT地址发送资产,如果向非USDT地址发出资产将不可找回.仅支持USDT-ERC20的转出.请认真核实ERC20地址,确保无误后进行修改填写.
		</view>
		<view class="titlebox">
			<view class="box_head">
				请输入提币地址
			</view>
			<!-- <input v-model="qianbao" class="inputext" placeholder="提币地址" /> -->
			<input class="inputext" v-model="message.qianbao" placeholder='提币地址' v-if="message.qianbao" />
			<input class="inputext" v-model="qianbao" placeholder='提币地址' v-else />
		</view>
		<view class="titlebox">
			<view class="box_head">
				请输入二级密码
			</view>
			<input type="password" v-model="qianbao_pass" class="inputext" placeholder="二级密码" />
		</view>
		<button @tap="get_modify" class="landing" type="primary">提交</button>
	</view>
</template>

<script>
	import config from '../../utils/config.js'
	import message from '../../service/message.js';
	export default {
		data() {
			return {
				rechargeType: null,
				message: null,
				modify: null,
				qianbao_pass: null,
				qianbao: null
			}
		},
		onShow() {
			this.get_message();
		},
		methods: {
			get_modify() {
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				if (this.message.qianbao) {
					uni.request({
						url: config + 'member/qianbao_set',
						data: {
							id: data.id,
							qianbao_pass: this.qianbao_pass,
							qianbao: this.message.qianbao
						},
						header: {
							'token': data.token
						},
						method: 'POST'
					}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						if (res) {
							console.log(res.data);
							plus.nativeUI.alert(res.data.message)
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
						url: config + 'member/qianbao_set',
						data: {
							id: data.id,
							qianbao_pass: this.qianbao_pass,
							qianbao: this.qianbao
						},
						header: {
							'token': data.token
						},
						method: 'POST'
					}).then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						var [error, res] = data;
						if (res) {
							console.log(res.data);
							plus.nativeUI.alert(res.data.message)
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
			},
			async get_message() {
				this.message = await message.get_message();
				// console.log(this.message+"用户信息");
			},
		}
	}
</script>

<style>
	.titlebox {
		margin-top: 40upx;
	}

	.inputext {
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 15upx;
		font-size: 28upx;
		color: #070C20;
		padding-left: 20upx;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left, #4286de, #5091e6);
		margin-top: 40upx;
	}

	.usdt_text {
		width: 100%;
		margin: auto;
	}
</style>
