<template>
	<view class="box">
		<mescroll-uni  @down="downCallback" @up="upCallback" >
			<view style="margin: 20upx;" v-for="(item,index) in data.list" key="index">
				<view style="display: flex;">
					<view style="color: #999;width: 60%;">转账</view>
					<view style="color: #349cfe;width: 40%;font-size: 30upx;font-weight: 600;">{{item.num}}</view>
					
				</view>
				
				<view style="display: flex;"> 
					<view style="color: #999;width: 60%;">{{item.rel_id}}</view>
					<view style="color: #999;width: 40%;">{{item.created_at}}</view>
				</view>
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
				data:{},
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
			// async mescrollInit(mescroll) {
			// 	let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
			// 	const query = {
			// 		id:datas.id,
			// 		page:1
			// 	}
			// 	let res = await service.httpRequest('zhuan_log',query)
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
				let res = await service.httpRequest('zhuan_log',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
				console.log(res.data)
			
				console.log(mescroll.num)
				let current_count =this.data.current_count; 
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page); 
			}
		}
	}
</script>

<style>
	.box{
		height: 150upx;
	}
</style>
