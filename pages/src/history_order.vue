<template>
	<view class="">
		<view class="store" v-if="data.total>0" style="width: 90%;margin: auto;box-shadow: 0px 5px 15px #888888;margin-top: 50upx;border-radius: 30upx;height: auto;">
			<view style="">
				<mescroll-uni @down="downCallback" @up="upCallback">
					<view class="" style="margin: auto;width: 90%;text-align: center;padding-top: 30upx;height: auto;">
					<text style="color: red;">历史接单({{data.total}})</text>
					</view>
					<view v-for="item in data.list" style="width: 90%;border: #ccc 1px solid;border-radius: 8upx;margin: 0 auto;margin-top: 50upx;padding: 20upx;">
						<view class="liushui"  style="display: flex;justify-content: space-between;">
							<text class="title" style="color: red;">收款流水</text>
							<text>已入账</text>
						</view>
						<view class="" style="text-align: left;">
							<view>收款金额:{{item.zong}}.</view>
							<view>US流水:{{item.num}}+{{item.ticheng}}</view>
							<view>收款时间:{{item.updated_at}}</view>
							<view>订单编号:{{item.sn}}</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="store" v-else>
			<mescroll-uni @down="downCallback" @up="upCallback">

			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import service from '../../utils/httpRequest.js'
	import MescrollUni from '../../components/mescroll-uni/mescroll-uni.vue'

	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				data: [],
				mescroll: null
			}
		},
		onReachBottom() {
			this.mescroll && this.mescroll.onReachBottom();
		},
		//注册列表滚动事件,用于下拉刷新
		onPageScroll(e) {
			this.mescroll && this.mescroll.onPageScroll(e);
		},
		onLoad() {
			this.mescrollInit();
		},
		methods: {
			async mescrollInit(mescroll) {
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id: datas.id,
					page: 1
				}
				let res = await service.httpRequest('jiedan_log', query)
				this.data = res.data
				console.log(JSON.stringify(res.data)+"res.data")
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

</style>
