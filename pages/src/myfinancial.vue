<template>
	<view style="border-radius: 20upx;height: 320upx;">
		<view style="display: flex;justify-left: space-between;">
			<view @tap="getchang(index)" v-for="(item,index) in title" class="box" :class="{active:index==isActive}">{{item.type}}</view>
		</view>
		<view style="width: 100%;">
			<image src="../../static/img/line.png" style="height: 1upx;width: 100%;margin: 20upx auto;"></image> 
		</view>
		<view style="display: flex;justify-content: space-between;padding: 20upx 40upx;">
			<view class="textnav">参与数量</view>
			<view class="textnav">参与时间</view>
			<view class="textnav">状态</view>
			<view class="textnav">当前期数</view>
		</view>
		
		<mescroll-uni top="260"   @down="downCallback"  @up="upCallback" >
		<view v-for="item in data.list" style="display: flex;justify-content: space-between;padding: 20upx 40upx;">
			<view class="textnav1" >{{item.num}}</view>
			<view class="textnav1" >{{item.created_at}}</view>
			<view class="textnav1" >{{item.status==0?'购买中':(item.status==1?'进行中':(item.status==3?'冻结待补':(item.status>3?'购买失败':'已完成')))}}</view>
			<view class="textnav1" >{{item.now+'/'+item.chang+'('+item.lun+')'}}</view>
		</view>
		</mescroll-uni>
		
	</view>
</template>

<script>
	import MescrollUni from '../../components/mescroll-uni/mescroll-uni.vue'
	import service from '../../utils/httpRequest.js'
	export default{
		components: { MescrollUni },
		data(){
			return {
				mescroll: null,
				data:{},
				isActive:0,
				title:[{type:'全部'},{type:'购买中'},{type:'购买成功'},{type:'购买失败'}],
				state:{
					0:'购买中',
					1:'进行中',
					3:'已完成',
					4:'冻结待补'
				}
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
			// async mescrollInit(mescroll) {
			// 	let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
			// 	const query = {
			// 		id:datas.id,
			// 		type:0,
			// 		page:1
			// 	}
			// 	let res = await service.httpRequest('my_licai',query)
			// 	this.data = res.data
			// 	this.mescroll = mescroll
			// },
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			async getchang(index=0){ 
				this.isActive = index;	
				
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id:datas.id,
					type:index,
					page:1
				}
				let res = await service.httpRequest('my_licai',query)
				this.data = res.data
			},
			async upCallback(mescroll) {
				
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id:datas.id,
					type:this.isActive,
					page:mescroll.num 
				}
				let res = await service.httpRequest('my_licai',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据

				this.data = res.data
				let current_count =this.data.current_count; 
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page); 
				// mescroll.endBySize(current_count, total); 
				// mescroll.endSuccess(current_count, total); 
				// mescroll.endBySize(current_count, total); 
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
	}
	.textnav1{
		color: #349cfe; 
		font-size: 30upx;
		text-align: center;
		margin-top: 40upx;
	}
	.box{
		height: 60upx;
		width: 20%;
		color: #657995;
		font-size: 24upx;
		text-align: center;
		border-radius: 50upx;
		line-height: 60upx;
		margin: 20upx;
	}
	.active{
		height: 60upx;
		width: 20%;
		background: #283247;
		color: #fff;
		font-size: 24upx;
		text-align: center;
		border-radius: 50upx;
		line-height: 60upx;
		margin: 20upx;
	}
</style>
