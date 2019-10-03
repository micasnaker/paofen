<template>
	<view>
		<view style="width: 100%;">
			<image src="../../../../static/img/line.png" style="height: 1upx;width: 100%;margin: 0 auto;"></image> 
		</view>
		
		<view style="display: flex;">
			<view class="textnav1">ID</view>
			<view class="textnav1">昵称</view>
			<view class="textnav1">投资数量</view>
			<view class="textnav1">注册时间</view>
		</view>
		
		<view style="width: 100%;">
			<image src="../../../../static/img/line.png" style="height: 1upx;width: 100%;margin: 0 auto;"></image> 
		</view>
		
		<mescroll-uni top="120"  @down="downCallback"  @up="upCallback" >
		<view v-for="item in data.list" style="display: flex;margin: 10upx;">
			<view class="textnav" >{{item.tid}}</view>
			<view class="textnav" >{{item.name}}</view>
			<view class="textnav" >{{item.touzi}}</view>
			<view class="textnav" >{{item.created_at.slice(0,10)}}</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script> 
	import service from '../../../../utils/httpRequest.js' 
	import MescrollUni from '../../../../components/mescroll-uni/mescroll-uni.vue'
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
				let res = await service.httpRequest('my_xiaji',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
			
				console.log(mescroll.num)
				let current_count =this.data.current_count; 
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page); 
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
		width: 25%;
		height: 24upx;
		color: #349cfe; 
		font-size: 30upx;
		text-align: center;
		line-height: 48upx;
	}
</style>
