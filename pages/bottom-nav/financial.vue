<template>
	<view class="wallet">
		<view class="wallet_wrap">
			<view class="title">
				<text class="wallet_yue">钱包余额</text>
			</view>
			<view class="wallet_num"><text style="color: #fff !important;background-color: #008ee7;">USDT:{{message.num}}</text></view>
		</view>
		<view class="edu">
			<view class="edu_wrap">
				<image class="edu_img" src="../../static/paofen/bg01.png" mode=""></image>
				<view class="edu_posi">
					<view class="title" style="font-size:28upx;font-family:PingFang SC;font-weight:500;color:rgba(255,255,255,1);">
						剩余额度(USDT)
					</view>
					<text style="font-size:50upx;font-family:PingFang SC;font-weight:500;color:rgba(255,255,255,1);">{{message.blance}}</text>
				</view>
			</view>
			<view class="edu_wrap">
				<image class="edu_img" src="../../static/paofen/bg01.png" mode=""></image>
				<view class="edu_posi" style="display: flex;">
					<view class="title" v-if="message.is_auth == 2" style="font-size:28upx;font-family:PingFang SC;font-weight:500;color:rgba(255,255,255,1);">
						收款码正常
					</view>
					<view class="title" @tap="go_auth" v-else style="font-size:28upx;font-family:PingFang SC;font-weight:500;color:rgba(255,255,255,1);width: 130upx;">
						收款码审核中
					</view>
					<view class="erweimas">
						<image src="static/paofen/code.jpg" mode="" class="erweima_imgs"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 马上接单 -->
		<view class="titlenavs" style="margin-top: 20upx;">
			<view style="display: flex;margin-left: 40upx;justify-content: space-between;width: 80%;margin: auto;">
				<view style="margin-top: 30upx;">本轮编号：{{message.pici}}</view>
				<!-- <view style="display: flex;margin: 30upx 40upx;">
					<view class="fontbg">{{hour}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{minute}}</view><text style="margin: 0 5upx;">:</text>
					<view class="fontbg">{{second}}</view>
				</view> -->
				<view @tap="go_conduct" style="background: #00b4ff;margin-left: 10%;margin-top: 30upx;height: 40upx;width: 130upx;text-align: center;line-height: 40upx;color: white;border-radius: 20upx;"
				 v-if="!message.pici">马上接单</view>
				<view v-else style="margin-left: 10%;margin-top: 30upx;line-height: 40upx;">
					<!-- <image src="../../static/paofen/starting.gif" mode="" style="height: 70upx;width: 70upx;"></image> -->
					接单中...
				</view>
			</view>
			<view style="width: 90%;height: 1upx;background: #cce6f7;margin: 20upx auto;"></view>
		</view>
		<!-- 正在执行 -->
		<view class="zhixing" style="width: 80%;display: flex;margin: auto;align-content: center;align-items: center;text-align: center;">
			<!-- <text class="zhixing_nav" style="font-size:28upx;font-family:PingFang SC;font-weight:500;color:rgba(0,147,255,1);">正在执行(0)</text> -->
			<!-- <text class="zhixing_nav" style="font-size:28upx;font-family:PingFang SC;font-weight:500;color:rgba(0,147,255,1);"></text> -->
			<view @tap="history_order" class="history" style="font-size:28upx;font-family:PingFang SC;font-weight:400;color:rgba(1,10,17,1);margin: auto;width: 30%;border: 1upx solid #0189FF;border-radius: 20upx;">历史接单</view>
		</view>
		<view class="store" v-if="data.total>0" style="width: 90%;margin: auto;box-shadow: 0px 5px 15px #888888;margin-top: 10upx;border-radius: 30upx;height: auto;padding: 20upx;">
			<view style="">
				<view v-for="item in dataSli" style="width: 88%;border: #ccc 1px solid;border-radius: 8upx;margin: 0 auto;margin-top: 30upx;padding: 20upx;margin-bottom: 30upx;">
					<view class="liushui" style="display: flex;justify-content: space-between;">
						<text class="title" style="color: #03A9F4">收款流水</text>
						<text>已入账</text>
					</view>
					<view class="" style="text-align: left;">
						<view>收款金额:{{item.zong}}</view>
						<view>US流水:{{item.num}}+{{item.ticheng}}</view>
						<view>收款时间:{{item.updated_at}}</view>
						<view>订单编号:{{item.sn}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="recode" style="width: 90%;margin: auto;padding-top: 50upx;text-align: center;font-size: 35upx;">
			暂无接单记录
		</view>
	</view>
</template>

<script>
	import message from '../../service/message.js'
	import service from '../../utils/httpRequest.js'
	import MescrollUni from '../../components/mescroll-uni/mescroll-uni.vue'

	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				message: null,
				hour: 0,
				minute: 0,
				second: 0,
				timer: null,
				data: [],
				dataSli: [],
				mescroll: null
			};
		},
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		onShow() {
			this.get_message();
		},
		onLoad() {
			this.get_timer();
			this.mescrollInit();
		},
		methods: {
			async get_message() {
				this.message = await message.get_message()
				// console.log(this.message)				
			},
			async get_timer() {
				let data = uni.getStorageSync('storage')

				const query = {
					id: data.id
				}

				this.timer = await service.httpRequest('my_paofen', query)

				this.hour = this.timer.data.hour
				this.minute = this.timer.data.minute
				this.second = this.timer.data.second

				//计时
				var int;
				var millisecond = 0; //毫秒
				function Reset() //重置
				{
					window.clearInterval(int);
					millisecond = this.hour = this.minute = this.second = 0;
				}


				if (this.timer.data.status != 0) {
					int = setInterval(() => {
						this.second++;
						if (this.second >= 60) {
							this.second = 0;
							this.minute = this.minute + 1;
						}

						if (this.minute >= 60) {
							this.minute = 0;
							this.hour = this.hour + 1;
						}


					}, 1000);
				}
			},
			go_conduct() {
				if (this.timer.data.status == 0) {
					uni.navigateTo({
						url: '../src/profit/conduct'
					})
				} else {
					plus.nativeUI.alert('接单中...')
				}
			},
			history_order() {
				uni.navigateTo({
					url: '../src/history_order'
				});
			},
			go_auth() {
				uni.navigateTo({
					url: '../src/userinfo/list/authentications'
				});
			},
			async mescrollInit(mescroll) {
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id: datas.id,
					page: 1
				}
				let res = await service.httpRequest('jiedan_log', query)
				this.data = res.data;
				//console.log(JSON.stringify(res.data) + "res.data")
				this.dataSli = res.data.list.slice(0, 2)
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll();
			},
			async upCallback(mescroll) {
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id: datas.id,
					page: mescroll.num
				}
				let res = await service.httpRequest('jiedan_log', query)
				let curPageData = res.data.list

				if (mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
				console.log(res.data)
				console.log(mescroll.num)
				let current_count = this.data.current_count;
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page);
			}
		}
	}
</script>

<style>
	.wallet {
		width: 100%;
		height: 100%;
	}

	.wallet_wrap {
		width: 90%;
		margin: auto;
		height: 350upx;
	}

	.wallet_yue {
		font-size: 38upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(1, 10, 17, 1);
		padding-left: 70upx;
		padding-top: 60upx;
		text-align: center;
	}

	.wallet_num {
		font-size: 60upx;
		font-family: PingFang SC;
		font-weight: 500;
		margin: 0 auto;
		width: 80%;
		padding-top: 60upx;
		text-align: center;
	}

	.edu {
		width: 90%;
		margin: auto;
		display: flex;
		justify-content: space-between;
	}

	.edu_wrap {
		width: 49%;
		height: 174upx;
		border-radius: 6px;
	}

	.edu_img {
		width: 100%;
		height: 174upx;
	}

	.edu_posi {
		position: absolute;
		margin-top: -180upx;
		padding-left: 20upx;
	}

	.erweima {
		width: 140upx;
		height: 140upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		text-align: center;
		margin-left: 20upx;
		margin-top: 10upx;
	}

	.erweimas {
		width: 160upx;
		height: 160upx;
		border-radius: 2px;
		text-align: center;
		margin-left: 20upx;
		margin-top: 5upx;
	}

	.erweima_img {
		width: 114upx;
		height: 114upx;
		margin: auto;
		margin-top: 14upx;
	}

	.erweima_imgs {
		width: 134upx;
		height: 134upx;
		margin: auto;
		margin-top: 14upx;
	}

	.titlenavs {
		background: #fff;
	}

	.fontbg {
		background: #b7b7b7;
		border-radius: 3upx;
		width: 40upx;
		text-align: center;
	}
</style>
