<template>
	<view>
		<view style="display: flex;justify-content: space-between;padding: 20upx">
			<view class="textnav1">推荐人ID</view>
			<view class="textnav1">推荐人投资</view>
			<view class="textnav1">收益率<view style="color: #349cfe;font-size: 20upx;">（期数）</view></view>
			<view class="textnav1">总收益</view>
		</view>
		
		<view style="width: 100%;">
			<image src="../../../static/img/line.png" style="height: 1upx;width: 100%;margin: 20upx auto;"></image> 
		</view>
		
		<mescroll-uni top="150"  @down="downCallback"  @up="upCallback" >
			<view  v-for="item in data.list" style="display: flex;justify-content: space-between;">
				<view class="textnav" >{{'ID:'+item.rel_id}}</view>
				<view class="textnav" >{{item.touzi}}</view>
				<view class="textnav" >{{item.bili?item.bili*100+'%':''}}</view>
				<view class="textnav" >{{item.shouyi}}</view>
			</view>
		</mescroll-uni>
		
	</view>
</template>
<script>
	import service from '../../../utils/httpRequest.js'
	import MescrollUni from '../../../components/mescroll-uni/mescroll-uni.vue'
	
	export default {
		components: { MescrollUni },
		data() {
			return {
				data: {},
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
		methods: {
			// async mescrollInit(mescroll) {
			// 	let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
			// 	const query = {
			// 		id:datas.id,
			// 		page:1
			// 	}
			// 	let res = await service.httpRequest('tuijian_log',query)
			// 	this.data = res.data
			// 	
			// 	this.mescroll = mescroll;
			// },
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			async upCallback(mescroll) {
				
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id:datas.id,
					page:mescroll.num
				}
				let res = await service.httpRequest('tuijian_log',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data

				//console.log(mescroll.num)
				let current_count =this.data.current_count
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page)
			}
		}
	}
</script>

<style>
	.textnav{
		color: white;
		width: 25%;
		font-size: 30upx;
		text-align: center;
		margin-top: 60upx;
	}
	.textnav1{
		color: #349cfe; 
		font-size: 30upx;
		text-align: center;
	}
</style>
