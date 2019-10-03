<template>
	<view>
		<view class="titlenav">
			<view style="margin: 40upx;">
				<view  style="position: relative;height: 40upx;">
					<image style="width: 60upx;height: 60upx;position: absolute;top: -50%;margin-top: 55upx;" src="../../static/img/quotations.png"></image>
					<text style="color: white;position: absolute;margin-left: 80upx;margin-top: 40upx;">收益</text>	
				</view>	
				
				<view style="color: aliceblue;font-size: 24upx;margin: 80upx 0 0 50upx;">总收益折合（USDT）：</view>
				<view style="width: 100%;margin-top: 20upx;">
					<view style="font-size: 48upx;color: #349cfe;margin: 0 auto;width: 40%;text-align: center;">{{message.z_shouyi==null?0:message.z_shouyi}}</view>
				</view>
				
				<view style="width: 100%;">
					<image src="../../static/img/line.png" style="height: 1upx;width: 100%;margin: 20upx auto;"></image> 
				</view>
				
				<view style="display: flex;justify-content: space-between;">
					<view class="bottomview" @tap="go_conduct"><view class="textnav">理财包收益</view><view class="textnav">{{message.licai_shouyi}}</view></view>
					<view class="bottomview" @tap="go_recommend"><view class="textnav">推荐收益</view><view class="textnav">{{message.tuijian_shouyi}}</view></view>
					<view class="bottomview" @tap="go_team"><view class="textnav">团队收益</view><view class="textnav">{{message.tuandui_shouyi}}</view></view>
				</view>
			</view>
		</view>
		
		<view class="listnav" style="margin-top: 40upx;" @tap="go_conduct">
			<text class="textnav" >理财包收益明细</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_recommend">
			<text class="textnav" >推荐明细</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_team" style="border-bottom: #1f2a3e solid 0.5upx;">
			<text class="textnav" >团队明细</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view class="listnav" @tap="go_yiyuan" style="border-bottom: #1f2a3e solid 0.5upx;">
			<text class="textnav" >一元购明细</text>
			<image src="../../static/img/rights.png" style="float: right;margin-top: 8upx;width: 30upx;height: 30upx;"></image>
		</view>
		<view @tap="go_an" style="width: 70%;margin: 0 auto;text-align: center;color: #576984;margin-top: 40upx;text-decoration: underline;">关于CMP平台USDT充值规则的公告</view>
	</view>
</template>

<script>
	import message from '../../service/message.js'
	
	export default{
		data(){
			return{
				message:null
			}
		},
		onShow(){
			this.get_message()
		},
		methods:{
			async get_message(){
				this.message = await message.get_message()
				//console.log(this.message.licai_shouyi)
			},
			go_conduct(){
				uni.navigateTo({
					url: 'profit/conduct' 
				})
			},
			go_an(){
				uni.navigateTo({
					url: 'an' 
				})
			},
			go_recommend(){
				uni.navigateTo({
					url: 'profit/recommend' 
				})
			},
			go_team(){
				uni.navigateTo({
					url: 'profit/team' 
				})
			},
			go_yiyuan(){
				uni.navigateTo({
					url: 'profit/yiyuan' 
				})
			}
		}
	}
</script>

<style >
	.titlenav{
		width: 94%;
		height: 500upx;
		background: #091629;
		border-radius: 30upx;
		margin: 0 auto; 
		position: relative;
	}
	.float{
		height: 28%;
		width: 46%;
		background: #1C1D22;
		margin: 13upx;
		border-radius:20upx ;
		float: left;
	}
	.textnav{
		color: white; 
		font-size: 28upx;
		margin: 20upx 10upx;
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
</style>
 