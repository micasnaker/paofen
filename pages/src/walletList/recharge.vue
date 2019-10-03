<template>
	<view style="padding: 40upx">

		<text style="font-size: 36upx;" class="typetext">钱包余额：{{message.num}}</text> 
		<view @tap="go_rechargerecord" style="float: right;text-decoration: underline;">充值记录</view>
		<view style="display: flex;">
			<view class="titlebox" >
				<view class="typetext">充值类型：</view> 
				
					<picker @change="bindPickerChange" :value="index" :range="array"> 
						<input disabled ="disabled" :placeholder="rechargeType==null?'USDT':rechargeType" style="border: #212a3c 1upx solid;border-radius: 15upx;height: 80upx;margin-top: 15upx;font-size: 28upx;"/>
						<image style="width: 30upx;height: 30upx;float: right;margin-top: -50upx;margin-right: 20upx;" src="../../../static/img/triangle.png"></image>
					</picker>
			</view> 
			<view class="titlebox" style="margin-left: 10%">
				<view class="typetext">请输入充值金额：</view> 
				<input type="number" v-model="num"  class="inputext" placeholder="请输入充值金额" />
			</view>
		</view> 
		
		<view class="titlebox" >
			<view  class="typetext">请输入附加码：</view> 
			<input v-model="TransactionID" class="inputext" placeholder="附加码" />
		</view> 

		<view  class="typetext">备注：</view> 
		<textarea v-model="beizhu" auto-height='true' style="margin: 20upx auto;border: #212a3c 1upx solid;border-radius: 15upx;padding: 20upx;width: 95%;"></textarea>
<!-- 		<view class="titlebox" >
			<view class="typetext">充值地址：</view>  
			
			<view >
				<input style="width: 80%;" disabled class="inputext" :placeholder="message.common_qianbao" /> 
				<view style="float: right;margin-top: -60upx;">
					<image @tap="copy" src="../../../static/img/jia.png" style="width: 40upx;height: 40upx;"></image>
				</view>
			</view>
			<view class="tis" style="color: red;">*为了您的资金安全，点击复制充值地址，请勿手动输入转账(充值)地址！</view>
		</view> -->
		<button @tap="get_conduct" class="landing" type="primary">提交</button>
<!-- 		<view @tap="go_announcement" style="width: 70%;margin: 0 auto;text-align: center;color: #576984;margin-top: 40upx;text-decoration: underline;">关于CMP平台USDT充值规则的公告</view> -->
		<view v-if="shows" style="background: #D8D8D8;margin-top: 60upx;padding: 20upx;border-radius: 10upx;">
			<text>需要支付{{res.data.num}}USDT</text><text style="color: red;float: right;">等待审核</text>
			<view>附加码：{{res.data.trans_no}}</view>
			
			
			<view style="display: flex">
				<view style="width: 50%;">
					<text style="word-wrap:break-word">充值地址：{{res.data.common_qianbao}}</text>
				
					<view style="margin-top: 20upx;">
						<view>备注：{{res.data.msg}}</view>
						<view>{{res.data.created_at}}</view> 
					</view>
				</view>
				
				<view style="margin-left: 100upx;">
					<view>充值二维码:</view>

					<image style="width: 200upx;height: 200upx;" :src="codeurl"></image>
				</view>
			</view>
			
			<button @tap="revoke" class="landings">撤销</button>
		</view>
	</view>
</template>

<script>
	import service from '../../../utils/httpRequest.js'
	import message from '../../../service/message.js'
	import QR from '../../../utils/wxqrcode.js'
	export default{
		data(){
			return{
				rechargeType: null,
				array: ['USDT'],
				res:[],
				number:1,
				num:null,
				TransactionID:parseInt(Math.random()*(999999-100000)+100000,10) ,
				message:null,
				upLoadClicktag:0,
				beizhu:null,
				shows:false,
				codeurl:null
			}
		},
		onLoad() {
			this.get_message()
		},
		onShow() {
			this.get_onload()	  
		},
		methods:{
			copy(){
				uni.setClipboardData({
					data: this.message.common_qianbao,
					success: function () {
						//plus.nativeUI.toast('复制成功！')
					}
				});
			},
			go_announcement(){
				uni.navigateTo({
					url: './recharge_announcement'
				});
			},
			go_rechargerecord(){
				uni.navigateTo({
					url: 'Rechargerecord'
				})
			},
			async get_message(){
				this.message = await message.get_message()
				
				console.log(this.message)
			},
			bindPickerChange: function(e) {
				this.number = parseInt(e.target.value)+1
				this.rechargeType = this.array[e.target.value]
			},
			async get_conduct(){ 
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
					if(this.res.status==0){
						let data = uni.getStorageSync('storage')
						
						const query = {
							id:data.id,
							num:this.num,
							trans_no:this.TransactionID,
							common_qianbao: this.message.common_qianbao,
							msg:this.beizhu 
						}
						//console.log(query)
						this.res = await service.httpRequest('chongzhi',query)
						// console.log(JSON.stringify(this.res)+111111)
						plus.nativeUI.toast(this.res.message)
						if(this.res.error_code==0){
							// uni.navigateBack({
							// 	delta: 1
							// })
							this.shows=true
						}
					}else{
						plus.nativeUI.alert('还有订单未处理，无法充值！')
					}
					setTimeout (()=>{
						this.upLoadClicktag = 0
					},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			},
			async get_onload(){
				
				let data = uni.getStorageSync('storage')
				
				const query = {
					id:data.id
				}
				//console.log(query)
				let	res = await service.httpRequest('get_chongzhi',query)
				this.res=res.data
				
				this.codeurl = QR.createQrCodeImg(res.data.data.common_qianbao, {  
					size: parseInt(500),//二维码大小 
				})

				// console.log(this.res.status)
				if(this.res.status==0){
					this.shows=false
				}else if(this.res.status==1){
					this.shows=true
					
				}
			},
			async revoke(){

					let data = uni.getStorageSync('storage')
					
					const query = {
						id:data.id,
						sn_id:this.res.data.id
					}
					let	res = await service.httpRequest('del_chongzhi',query)
					// console.log(this.res.data.id)
					if(res.error_code==0){
						this.shows=false
						plus.nativeUI.toast('撤回成功！')
					}
					
			}
		}
	}
</script>

<style>
	.tis{
		font-size: 24upx;
		color: #4286de;
	}
	.typetext{
		color: #349cfe;
	}
	.titlebox{
		margin-top: 40upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 15upx;
		font-size: 28upx;
	}
	.landing{ 
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
		margin-top: 60upx;
	}
	
	.landings{ 
		height: 60upx;
		line-height: 60upx;
		width: 200upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
		margin-top: 60upx;
		color: #fff;
		margin-left: 60%;
	}

</style>
