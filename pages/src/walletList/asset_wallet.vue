<template>
	<view class="wallet">
		<image src="../../../static/paofen/bg01.png" mode="" class="bg"></image>
		<view class="zc_wallet">
			<text>资产钱包(USDT)</text>
			<view class="usdt_num">
				{{message.num}}
			</view>
		</view>
		<view class="wallet_pwd">
			<view class="title">
				请输入二级密码导出私钥
			</view>
			<input class="wallet_input" type="text" value="" placeholder="请输入二级密码" />
		<button style="border: 60upx;margin-top: 60upx;" type="primary" @tap="export_con">确定导出</button>
		</view>
	</view>
</template>

<script>
	import service from '../../../utils/httpRequest.js'
	import message from '../../../service/message.js'
	export default{
		data(){
			return {
				res:[],
				num:null,
				password:null,
				message:null,
				codeurl:'',
				upLoadClicktag:0
			}
		},
		onLoad(option) {
			this.get_message()
		},
		methods:{
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
			},
			export_con(){
				uni.navigateTo({
					url: './ex_store'
				});
			}
		}
	}
</script>

<style>
	.wallet{
		width: 100%;
		height: 100%;
	}
	.bg{
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
	.zc_wallet{
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
	.usdt_num{
		padding-top: 30upx;
		font-size: 50upx;
		color: #FFFFFF;
	}
	
	.wallet_pwd{
		padding-top: 350upx;
		width: 90%;
		margin: auto;
	}
	.wallet_input{
		border: 1px solid #ccc;
		border-radius: 30upx;
		text-align: left;
		padding-left: 20upx;
		margin-top: 20upx;
		height: 60upx;
		line-height: 60upx;
	}
</style>
