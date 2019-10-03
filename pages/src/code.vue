<template>
	<view class="titlenav">
		<view style="margin-top: 40upx;">
			<view style="width: 100%;" v-if="message.is_auth == 2">
				<view style="width: 500upx;height: 400upx;margin: 0 auto;padding: 40upx 0;background: #fff;">
					<view  style="width: 400upx;height: 400upx;margin: 0 auto;">
						<image style="width: 400upx;height: 400upx;" :src="codeurl"></image>
					</view>
				</view>
				
				<view @tap="copy" style="text-decoration: underline;margin: 0 auto;color: #fff;text-align: center;margin-top: 50upx;">
					{{uls}}点击复制
				</view>
			</view>
			
			<view style="width: 100%;" v-else>
				<view style="width: 500upx;height: 400upx;margin: 0 auto;padding: 40upx 0;">
					<view  style="width: 450upx;height: 450upx;margin: 0 auto;">
						<image style="width: 450upx;height: 450upx;" src="static/paofen/code.jpg"></image>
					</view>
				</view>
				
				<view @tap="go_auth" style="text-decoration: underline;margin: 0 auto;color: #fff;text-align: center;margin-top: 50upx;">
					请实名认证后生成推广二维码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import message from '../../service/message.js'
	import QR from '../../utils/wxqrcode.js'
	import config from '../../utils/config.js'
	
	export default{
		data(){
			return{
				codeurl:'',
				message:null,
				uls:''
			}
		},
		onLoad() {
			this.get_message()
			
		},
		methods:{
			copy(){
				uni.setClipboardData({
					data: config.substring(0,config.length-4)+'CMP_register.php?p='+this.message.yaoqing,
					success: function () {
						//plus.nativeUI.toast('复制成功！')
					}
				});
			},
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
				console.log(config.substring(0,config.length-4))
				if(this.message !=null){
					this.uls = config.substring(0,config.length-4)+'CMP_register.php?p='+this.message.yaoqing
					this.codeurl = QR.createQrCodeImg(config.substring(0,config.length-4)+'CMP_register.php?p='+this.message.yaoqing, {  
						size: parseInt(300)//二维码大小  
					})
				}  
			},
			go_auth(){
				uni.navigateTo({
					url: './userinfo/list/authentications'
				});
			}
		}
	}
</script>

<style>
	.titlenav{
		width: 80%;
		background: #00acfe;
		border-radius: 30upx;
		margin: 80upx auto; 
		padding: 40upx;
	}
	.float{
		width: 40%;
		margin: 13upx;
		padding: 20upx;
		position: relative;
	}
	.username{
		color: white;
		font-size: 28upx;
	}
	.textnav3{
		color: #687c99;
		font-size: 28upx;
		margin-top: 80upx;
		text-align: center;
	}
	.icon{
		width: 65upx;
		height: 60upx;
		position: absolute;
		left: 50%;
		margin-left: -32upx;
	}
</style>
