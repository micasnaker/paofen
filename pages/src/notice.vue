<template>
	<view style="padding: 20upx;">
		<mescroll-uni  @down="downCallback" @up="upCallback" >
		<view @tap="go_details(index)" v-for="(item,index) in data.list" style="width: 90%;border: #fff 1px solid;border-radius: 5upx;margin: 0 auto;padding: 30upx;margin-top: 50upx;">
			<text style="color: #349cfe;font-size: 30upx;">{{item.title}}</text>
			<text style="color: #D5D5D5;font-size: 22upx;margin-left: 50upx;">{{item.updated_at}}</text>
			<view style="color: #fff;font-size: 26upx;">{{item.content}}</view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import service from '../../utils/httpRequest.js'
	import MescrollUni from '../../components/mescroll-uni/mescroll-uni.vue'
	
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
			// 		page_size:10,
			// 		page:1
			// 	}
			// 	let res = await service.httpRequest('member/message_list',query)
			// 	this.data = res.data
			// 	console.log(res.data)
			// 	this.mescroll = mescroll;
			// 	mescroll.endByPage(this.data.current_count, this.data.total_page); 
			// },
			downCallback(mescroll){
				mescroll.resetUpScroll()
			},
			async upCallback(mescroll) {
				let datas = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				const query = {
					id:datas.id,
					page_size:10,
					page:mescroll.num
				}
				let res = await service.httpRequest('member/message_list',query)
				let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
				
				console.log(mescroll.num)
				let current_count =this.data.current_count; 
				let total_page = this.data.total_page
				mescroll.endByPage(current_count, total_page); 
			},
			go_details(index){
				console.log(JSON.stringify(this.data.list[index]))
				uni.navigateTo({
					url: './details_announcement?data='+JSON.stringify(this.data.list[index])
				});
			}
		}
	}
</script>

<style>
</style>
