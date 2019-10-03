<template>
	<view>
		<view style="display: flex;justify-content: space-between;padding: 0 60upx">
			<view class="textnav1">购入金额</view>
			<view class="textnav1">购买期数</view>
			<view class="textnav1">收益</view>
		</view>
		<view style="width: 100%;">
			<image src="../../../static/img/line.png" style="height: 1upx;width: 100%;margin: 20upx auto;"></image> 
		</view>
		
	<mescroll-uni top="120"  @down="downCallback"  @up="upCallback" >
		<view v-for="item in data.list" style="display: flex;justify-content: space-between;padding: 0 40upx;">
			<view class="textnav" >{{item.cost}}</view>
			<view class="textnav" >{{item.duobao_id}}</view>
			<view class="textnav" >{{item.win}}</view>
		</view>
	</mescroll-uni>	
		
	</view>
</template>

<script> 
	import service from '../../../utils/httpRequest.js'
	import MescrollUni from '../../../components/mescroll-uni/mescroll-uni.vue'
	export default{
		components: { MescrollUni },
		data(){
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
		methods:{
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
						
			async upCallback(mescroll) {
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id:datas.id,
					page:mescroll.num
				}
				let res = await service.httpRequest('duobao/shouyi_list',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				//console.log(res.data)
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
				
			
				//console.log(mescroll.num)
				let current_count =this.data.current_count; 
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page); 
				// mescroll.endBySize(current_count, total); 
				// mescroll.endSuccess(current_count, total); 
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
