<template>
	<view style="padding: 20upx;">
		<mescroll-uni  @down="downCallback" @up="upCallback" >
		<view  v-for="item in data.list" style="width: 90%;border: #fff 1px solid;border-radius: 5upx;margin: 0 auto;padding: 30upx;margin-top: 50upx;">
			<view style="color: #fff;font-size: 26upx;">{{item.content}}</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import service from '../../../../utils/httpRequest.js'
	import MescrollUni from '@/components/mescroll-uni/mescroll-uni-option.js'
	
	export default{
		components: { MescrollUni },
		data(){
			return{
				data:[],
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
			// 	let res = await service.httpRequest('get_notices',query)
			// 	this.data = res.data
			// 	console.log(res.data)
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
				let res = await service.httpRequest('get_notices',query)
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
	
</style>
