<template>
	<view>
		<view style="height: 400upx;width: 100%;background: #00acfe;position: fixed;border-bottom-right-radius: 50%;border-bottom-left-radius: 50%;">
			<view style="text-align: center;color: #fff;margin-top: 60upx;font-size: 36upx;">{{message.name}}</view>
		</view>  
		<view style="height: 100upx;width: 100%;background: #00acfe"></view>  
		<view class="titlenav" style="margin-top: 60upx;">
			<view style="display: flex;height: 200upx;">

			<!-- 	<view style="border: #007AFF 6upx solid;border-radius: 50%;width: 120upx;height: 120upx;margin-top: 20upx;margin-left: 40upx;">

					<image :src="message.avatar" style="width: 120upx;height: 120upx;border-radius: 50%;"></image>
				</view> -->
				
				<view style="margin-left: 40upx;height: 160upx;margin-top: 40upx;">
					<view>
						<view  class="username">账号:{{message.phone}}</view> 
						<view class="phone_tag" @click="go_auth">实名认证:{{message.is_auth==2?message.id_name:'未实名'}}</view>
					</view>
					<view class="imgs " style="display: flex;float: right;margin-top: -40upx;">
						<image src="../../static/paofen/weixin.png"  @tap="weixin_img"></image> 
						<image src="../../static/paofen/zhifubao.png"  @tap="zhifubao_img"></image>
					</view>
<!-- 					<view >
						<view  class="username" style="margin: 10upx 0;">用户ID:{{message.tid}}</view> 
					
					</view> -->
<!-- 					<view  class="username">昵称:{{message.name}}</view> -->
				</view>  
				<view  style="margin-top: 30upx;margin-left: 25%;">
					<image @tap="go_notafication" style="width: 35upx;height: 42upx;" src="../../static/icon/xiaoxi.png"></image>
					<view v-if="state" style="width: 15upx;height: 15upx;background: red;border-radius: 15upx;float: right;"></view>
				</view>
			</view>
			
			<view style="width: 100%;">
				<view style="margin-left: 40upx;color: #989898;">钱包余额：</view>
				<view class="" style="margin: auto;text-align: center;">
					<text style="margin: 0 auto;text-align: center;color: #fff;font-size: 48upx;font-weight: 600;background-color: #008ee7;">USDT:{{message.num}}</text>
				</view>

			</view>
			
			<view style="display: flex;">
				<view style="width: 50%;"></view>
				<view style="display: flex;width: 50%;">
					<view @click="go_accounts" class="float"></image><view class="textnav3">转账</view></view>
					<view @tap="go_Withdrawmoney"  class="float"></image><view class="textnav3">提现</view></view>
					<view @tap="go_recharge" class="float"><view class="textnav3">充值</view></view>
				</view>
			</view>
		</view>
		
		<view style="margin: 0 10upx;width: 85%;overflow: hidden;">
			<view  class="animates">{{ress.data.title}}:{{ress.data.content}}</view>
		</view>
		
		<view class="titlenavs">			
			<view style="display: flex;margin-top: 20upx;">
				<view @tap="openCode" class="float"><image  src="../../static/icon/yaoqing.png" class="icon"></image><view class="textnav3s">邀请</view></view>
				<view @tap="go_team"  class="float"><image  src="../../static/icon/tuandui.png" class="icon"></image><view class="textnav3s">团队</view></view>
				<view @tap="go_zhinan" class="float"><image   src="../../static/icon/renwu.png" class="icon"></image><view class="textnav3s">指南</view></view>
			</view>
		</view>
		
		<view class="titlenavs" style="margin-top: 10upx;">			
			<view style="display: flex;margin-left: 40upx;justify-content: space-between;width: 80%;">
				<view style="margin-top: 30upx;">平台累计接单：<text style="font-size: 36upx;color: #007AFF;">{{message.zong_common}}</text></view>
<!-- 				<view style="margin-top: 30upx;">本轮接单已用时间</view>
				<view style="display: flex;margin: 30upx 40upx;"> -->
<!-- 					<view class="fontbg">{{message.begin_at.status==0?'00':message.begin_at.hour}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{message.begin_at.status==0?'00':message.begin_at.minute}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{message.begin_at.status==0?'00':message.begin_at.second}}</view> -->
					
<!-- 					<view class="fontbg">{{hour}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{minute}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{second}}</view>
				</view> -->
<!-- 				<view @tap="go_conduct" style="background: #00b4ff;margin-left: 10%;margin-top: 30upx;height: 40upx;width: 130upx;text-align: center;line-height: 40upx;color: white;border-radius: 20upx;">马上接单</view> -->
			</view>
			<view style="width: 90%;height: 1upx;background: #cce6f7;margin: 20upx auto;"></view>
			<view style="margin:  0 auto;width: 50%;padding-bottom: 20upx;text-align: center;">
				累计已有{{order_num}}人次接单
			</view>
		</view>

		<view style="height: 300upx;overflow: hidden;">
			<view class="animate" v-for="item in res" style="width: 94%;background: #dfdfdf;margin: 20upx auto;display: flex;padding: 5upx;">
<!-- 				<image :src="item.avatar" style="width: 40upx;height: 40upx;border-radius: 50%;background: #007AFF;margin:5upx 20upx;"></image> -->
				<view style="width: 40%;margin-left: 20upx;">{{item.phone.slice(0,3)}}****{{item.phone.slice(7,11)}}</view>
				<view style="width: 20%;">接单</view>
				<view style="width: 20%;">{{item.num}}</view> 
				<view style="width: 20%;">USDT</view>
			</view>
		</view>

	</view>
</template>

<script>
	import message from '../../service/message.js'
	import service from '../../utils/httpRequest.js'
	import config from '../../utils/config.js';
	
	export default{ 
		data(){
			return{
				message:null,
				res:[],
				state : false,
				hour:0,
				minute:0,
				second:0,
				timer:null,
				ress:null,
				order_num:0
			}
		},
		onShow() {
			this.get_message()
			
		},
		onLoad() {
			this.get_timer() 
			this.get_notice()
		},
		methods:{
			openCode(){
				if(this.message.jihuo==1){
					uni.navigateTo({
						url: '../src/code'
					})
				}else{
					plus.nativeUI.alert('账户未激活')
				}
			},
			go_recharge(){
				if(this.message.jihuo==1){
					uni.navigateTo({
						url: '../src/walletList/recharge'
					})
				}else{
					plus.nativeUI.alert('账户未激活！')
				}

			},
			go_Withdrawmoney(){
				
				if(this.message.jihuo==1){
					uni.navigateTo({
						url: '../src/walletList/Withdrawmoney'
					})
				}else{
					plus.nativeUI.alert('账户未激活')
				}
			},
			go_accounts(){
				if(this.message.jihuo==1){
					uni.navigateTo({
						url: '../src/walletList/account'
					})
				}else{
					plus.nativeUI.alert('账户未激活！')
				}
			},
			async get_message(){
				this.message = await message.get_message();
				let data = uni.getStorageSync('storage')
			
				const query = {
					id:data.id
				}
				
				let res = await service.httpRequest('pubu',query)
				this.res = res.data.list
				this.order_num=res.data.order_num

				let ress = await service.httpRequest('have_new_notices', query);
				// console.log(JSON.stringify(res)+"res")
				if (ress.data.status == 1) {
					this.state = true;
				} else {
					this.state = false;
				}
				
				
				if(this.timer.data.status==0){
					this.hour = 0
					this.minute = 0
					this.second = 0
				}
				
			},
			async get_timer(){
				let data = uni.getStorageSync('storage')
							
				const query = {
					id:data.id
				}
				
				this.timer = await service.httpRequest('my_paofen',query)
				
				this.hour = this.timer.data.hour
				this.minute = this.timer.data.minute
				this.second = this.timer.data.second
				
				//计时
				var int;
				var millisecond=0;//毫秒
				function Reset()//重置
				{
				  window.clearInterval(int);
				  millisecond=this.hour=this.minute=this.second=0;
				}
										   

				if(this.timer.data.status!=0){
					int=setInterval(()=>{
						this.second++;
					  if(this.second>=60){
						this.second=0;
						this.minute=this.minute+1;
					  } 
											   
					  if(this.minute>=60){
						this.minute=0; 
						this.hour=this.hour+1;
					  }
					  
											   
					},1000);
				}
			},
			async get_notice(){
				let data = uni.getStorageSync('storage')
				const query = {
					id:data.id
				}
				this.ress = await service.httpRequest('member/message',query)
			},
			go_notafication(){
				uni.navigateTo({
					url: '../src/notification'
				});
				
			},
			
			go_quotation(){
				uni.navigateTo({
					url: '../src/quotation'
				})
			}, 
			go_yiyuan(){
				uni.navigateTo({
					url: '../src/profit/yiyuan'
				})
			}, 
			go_conduct(){
				if(this.timer.data.status==0){
					uni.navigateTo({
						url: '../src/profit/conduct' 
					})
				}else{
					plus.nativeUI.alert('接单中...')
				}
			},
			go_recommend(){
				uni.navigateTo({
					url: '../src/profit/recommend' 
				})
			},
			go_team(){
				uni.navigateTo({
					url: '../src/profit/team' 
				})
			},
			go_zhinan(){
				uni.navigateTo({
					url: '../src/an' 
				})
			},
			weixin_img(){
				let payType = 1;
				uni.navigateTo({
					url: '../src/shoukuan?type=' + payType
				});
			},
			zhifubao_img(){
				let payType = 2;
				uni.navigateTo({
					url: '../src/shoukuan?type=' + payType
				});
			},
			go_auth(){
				if(this.message.is_auth!==2){
					uni.navigateTo({
						url:'../src/userinfo/list/authentications'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	$font-color:#fff;
	
	.animate {
		font-size: 18px;
		color: #687c99;
		display: inline-block;
		white-space: nowrap;
		animation: myMove 15s linear infinite;
		animation-fill-mode: forwards;
	}
	
	
	@keyframes myMove {
		  0% {
			transform: translateY(0);
		  }
		  100% {
			transform: translateY(-600%);
		  }
		}
		
	.animates { 
		color: #687c99;
		display: inline-block;
		white-space: nowrap;
		animation: 25s wordsLoop linear infinite normal;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(200px);
			-webkit-transform: translateX(200px);
		}
		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	@-webkit-keyframes wordsLoop {
		0% {
			transform: translateX(200px);
			-webkit-transform: translateX(200px);
		}
		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
	
	.titlenav{
		width: 94%;
		background: #fff;
		border-radius: 30upx;
		margin: 20upx auto; 
		position: relative;
		margin: 3%;
		box-shadow: 0px 3px 10px #888888;
	}
	.float{
		height: 28%;
		width: 46%;
		margin: 13upx;
		border-radius:20upx ;
		text-align: center;
	}
	.fontbg{
		background: #b7b7b7;
		border-radius: 3upx;
		width: 40upx;
		text-align: center;
	}

	.textnav{
		color: $font-color;
		font-size: 30upx; 
		text-align: center;
		margin: 40upx 0;
	}
	.imgs image {
		width: 34upx;
		height: 28upx;
		margin-left: 30upx;
		margin-top: 10upx;
	}
	

	.phone_tag {
		width: 380upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}

	

	.titlenavs{
		background: #fff;
	}
	.float{
		width: 40%;
		margin: 13upx;
		padding: 20upx;
		position: relative;
	}
	.textnav{
		color: #687c99; 
		font-size: 30upx;
	}
	.textnav3{
		color: #55b0ff;
		font-size: 28upx;
		text-align: center;
		text-decoration: underline;
	}
	
	.textnav3s{
		color: #000;
		font-size: 28upx;
		margin-top: 80upx;
		text-align: center;
	}
	.username{
		width: 372upx;
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(1, 10, 17, 1);
	}
	.listnav{
		margin: 0 auto;
		width: 88%;
		height: 40upx;
		border-top: #1f2a3e solid 0.5upx;
		line-height: 40upx;
		border-left:none;
		border-right:none;
		padding: 20upx;
	}
	.icon{
		width: 65upx;
		height: 60upx;
		position: absolute;
		left: 50%;
		margin-left: -32upx;
	}
	.login-btn{
		padding: 10upx 20upx;
		margin-top: 50upx;
	}
	.landing{ 
		width: 50%;
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
	}
</style>
 