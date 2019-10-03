<template>
	<view>
		<view class="titlenav">
			<view style="height: 140upx;position: relative;margin: 20upx;padding: 20upx;">
				<view style="display: flex;height: 200upx;">
					<image src="../../static/img/touxiang.png" style="width: 120upx;height: 120upx;border-radius: 50%;background: white;margin-top: 20upx;margin-left: 40upx;"></image>
					<view style="margin-left: 40upx;height: 160upx;">
						<view  class="username">账号:{{message.phone}}</view>
						<view >
							<view  class="username" style="margin: 10upx 0;">用户ID:{{message.tid}}</view> 
						</view> 
						<view  class="username">昵称:{{message.name}}</view> 
					</view> 
						 
				</view>
				

				<view style="position: absolute;right: 20upx;top: 50upx;">
					<image  @tap="openCode"  src="../../static/img/qrcode.png" style="height: 80upx;width: 80upx;"></image>
				</view>

			</view>
			
			<view style="width: 95%;margin: 0 auto;">
				<view class="float"><view class="textnav1">总资产：</view><view class="textnav">{{data.cpb}}</view></view>
				<view class="float"><view class="textnav1">钻石：</view><view class="textnav">{{data.zuanshi}}</view></view>
				<view class="float"><view class="textnav1">可用资产：</view><view class="textnav">{{data.keyong}}</view></view> 
				<view class="float"><view class="textnav1">冻结资产：</view><view class="textnav">{{data.dongjie}}</view></view>
			</view>	
		</view>

		<view style="background: #091629;border-radius:30upx ;margin: 20upx;padding: 20upx;position: relative;">
			<view  style="color: #349cfe;font-size: 30upx;">内部互转地址：</view>
			<view >
				<input style="width: 88%;background: #070d25;border-radius: 15upx;color: #666;font-size: 24upx;margin-top: 20upx;" :value="message.neibu_qianbao" />
				<image @tap="copy" src="../../static/img/jia.png" style="width: 40upx;height: 40upx;position: absolute;right: 40upx;bottom:24upx ;"></image>
			</view>
		</view>
		<view class="listnav" @tap="go_recharge" style="margin-top: 40upx;">
			<text class="textnav" >充值</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_Withdrawmoney" >
			<text class="textnav" >提币</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_accounts">
			<text class="textnav" >转账</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_rechargerecord">
			<text class="textnav" >充值记录</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_transferrecord">
			<text class="textnav" >转账记录</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_discount">
			<text class="textnav" >提现记录</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		
		<modal-view :hidden.sync="state" > 
			<view slot='title' style="margin-top: 40upx;">
				<view style="width: 500upx;margin: 0 auto;">
					<view style="display: flex;height: 200upx;">
						<image src="../../static/img/touxiang.png" style="width: 120upx;height: 120upx;border-radius: 50%;background: white;margin-top: 20upx;margin-left: 40upx;"></image>
						<view style="margin-left: 40upx;height: 160upx;">
							<view  class="username">账号:{{message.phone}}</view>
							<view >
								<view  class="username" style="margin: 10upx 0;">用户ID:{{message.tid}}</view> 
							</view> 
							<view  class="username">昵称:{{message.name}}</view> 
						</view> 
							 
					</view>
				</view>
			</view>
			<view slot='text' style="width: 100%;">
				<view style="width: 500upx;height: 400upx;margin: 0 auto;padding: 40upx 0;background: #fff;">
					<view  style="width: 400upx;height: 400upx;margin: 0 auto;">
						<image style="width: 400upx;height: 400upx;" :src="codeurl"></image>
					</view>
				</view>
				
				<view style="width: 90%;margin: 0 auto;color: #687c99;font-size: 24upx;text-align: center;margin-top: 50upx;">扫一扫上面的二维码图案，跟我交易</view>
			</view>
		</modal-view>
	</view>
</template>

<script>
	import information from '../../service/Userassetinformation.js'
	import message from '../../service/message.js'
	import modalView from '../../components/x-modal/x-modal.vue'
	import QR from '../../utils/wxqrcode.js'
	
	export default{
		components:{ modalView }, 
		data(){
			return{
				state : true,
				data:null,
				message:null,
				codeurl:''
			}
		},
		onShow(){
			this.get_message()
			this.get_information()
		},
		methods:{
			async get_information(){
				this.data = await information.get_information()
			},
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
			},
			go_recharge(){
				
				if(this.message.is_auth==2){
					uni.navigateTo({
						url: 'walletList/recharge'
					})
				}else{
					plus.nativeUI.alert('请先完成实名认证！')
				}
			},
			copy(){
				uni.setClipboardData({
					data: this.message.neibu_qianbao,
					success: function () {
						//plus.nativeUI.toast('复制成功！')
					}
				});
			},
			go_Withdrawmoney(){
				
				if(this.message.is_auth==2){
					uni.navigateTo({
						url: 'walletList/Withdrawmoney'
					})
				}else{
					plus.nativeUI.alert('请先完成实名认证！')
				}
			},
			go_accounts(){
				if(this.message.is_auth==2){
					uni.navigateTo({
						url: 'walletList/accounts'
					})
				}else{
					plus.nativeUI.alert('请先完成实名认证！')
				}
			},
			go_rechargerecord(){
				uni.navigateTo({
					url: 'walletList/Rechargerecord'
				})
			},
			go_transferrecord(){
				uni.navigateTo({
					url: 'walletList/Transferrecord'
				})
			},
			go_discount(){
				uni.navigateTo({
					url: 'walletList/DiscountRecord'
				})
			},
			getcodeurl(){
				this.codeurl = QR.createQrCodeImg(this.message.neibu_qianbao, {  
					size: parseInt(300)//二维码大小  
				})  
			},
			openCode(){
				this.state = false
				this.getcodeurl()
			}
		}
	}
</script>

<style >
	.titlenav{
		width: 94%;
		height: 560upx;
		background: #091629;
		border-radius: 30upx;
		margin: 0 auto; 
		position: relative;
	}
	.float{
		width: 46%;
		background: #070d25;
		margin: 13upx;
		border-radius:15upx ;
		float: left;
	}
	.textnav{
		color: white; 
		font-size: 30upx;
		margin: 10upx 10upx;
	}
	.textnav1{
		color: #349cfe;
		font-size: 32upx;
		margin: 10upx 10upx;
	}
	.username{
		color: white;
		font-size: 28upx;
	}
	.listnav{
		height: 60upx;
		border-top: #1f2a3e solid 0.5upx;
		line-height: 60upx;
		border-left:none;
		border-right:none;
		padding: 20upx;
	}
</style>
 