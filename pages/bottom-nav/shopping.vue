<template>
	<view>
		<image style="width: 100%;height: 350upx;" src="../../static/shoping/banner.png"></image>
		
		<view style="color: #000;width: 40%;margin: 0 auto;text-align: center;font-size: 40upx;">
			<text style="margin-right: 10upx;">-</text>
			超值兑换
			<text style="margin-left: 10upx;">-</text>
		</view>
		
		<view @tap="go">
			<view style="margin: 0 auto;width: 96%;margin-top: 40upx;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/yidong.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">中国移动</view>
						<view style="color: #4286de; font-size: 28upx;">话费卡兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/liantong.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">中国联通</view>
						<view style="color: #4286de; font-size: 28upx;">话费卡兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/dianying.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">中国电信</view>
						<view style="color: #4286de; font-size: 28upx;">话费卡兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/tengxun.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">腾讯视频</view>
						<view style="color: #4286de; font-size: 28upx;">会员兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/aiqiyi.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">爱奇艺视频</view>
						<view style="color: #4286de; font-size: 28upx;">会员兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/shiyou.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">中国石油</view>
						<view style="color: #4286de; font-size: 28upx;">油卡兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
			
			<view style="margin: 0 auto;width: 96%;">
				<view  class="listnav" style="display: flex;">
					<view style="margin: 20upx 40upx 0 0;">
						<image src="../../static/shoping/shihua.png" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view >
						<view style="color: #333; font-size: 32upx;">中国石化</view>
						<view style="color: #4286de; font-size: 28upx;">油卡兑换</view>
					</view>
					<view style="margin-top: 45upx;right: 40upx;position: absolute;">
						<image src="../../static/img/gengduo.png" style="width: 20upx;height: 30upx;"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			go(){
				plus.nativeUI.alert('此功能暂未开放，敬请期待！')
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.listnav{
		margin: 0 auto;
		width: 88%;
		height: 120upx;
		border: #e6e6e6 solid 0.5upx;
		line-height: 120upx;
		border-left:none;
		border-right:none;
		padding: 20upx;
	}
</style>
