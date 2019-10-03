<template>
	<view>
		<view style="margin-left: 20upx;">我的团队（直推{{data.zhitui}}人，团队{{data.team}}人）</view>
		<view class="titlenav" style="float: left;">
			
			<!-- <view style="width: 60upx;height: 60upx;border-radius: 50%;background: #349CFE;float: left;"> -->
				
			<!-- </view> -->
			<view style="float: left;">	
<!-- 				<text style="margin: 0 40upx ;">昵称:{{message.name}}</text> -->
				<text >账户:{{message.phone}}</text>
				<text style="padding-left: 40upx;">po点:{{message.po}}</text>

			</view>
			<view style="clear: both;width: 70%;margin: 0 auto;margin-top: 60upx;text-align: center;">
				<view>团队正在接单额度：{{data.ordering}}USDT</view>
				<view>团队累计接单额度：{{data.ordered}}USDT</view>
			</view>
		</view>
		
	<mescroll-uni top="400"  @down="downCallback"  @up="upCallback" >
		<view style="display: flex;">
			<view class="textnav1">手机</view>
			<view class="textnav1">po点</view> 
<!-- 			<view class="textnav1">激活状态</view> -->
		</view>
		
		<view v-for="(item,index) in data.list" style="display: flex;"> 
			<view class="textnav" >{{item.phone}}</view>
			<view class="textnav" @tap="showmodal(index)">{{item.po}}</view>
<!-- 			<view class="textnav" >{{item.jihuo==1?'激活':'未激活'}}</view> -->
		</view>
	</mescroll-uni>	
		
	<view>
		<neil-modal :show="shows" @close="bindBtn('cancel')" title="设置下级po"  @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')">
			<input v-model="value" placeholder="设置下级po" />
		</neil-modal> 
	</view>
			
	</view>
</template>

<script> 
	import service from '../../../utils/httpRequest.js'
	import MescrollUni from '../../../components/mescroll-uni/mescroll-uni.vue'
	import neilModal from '../../../components/neil-modal/neil-modal.vue'
	
	export default{ 
		components: { MescrollUni ,	 neilModal },
		data(){
			return {
				data: {},
				mescroll: null,
				message:null,
				shows: false,
				index:null,
				value:''
			}
		},
		onLoad(){
			this.message = uni.getStorageSync('storage')
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
			showmodal(index){
				this.index = index
				this.shows = !this.shows
			},		
			async bindBtn(type){
				if(type=='cancel'){
					this.shows = false
				}else if(type=='confirm'){ 
					//plus.nativeUI.alert('2222')
					let data = uni.getStorageSync('storage')
					const query = {
						id:data.id,
						po:this.value, 
						phone:this.data.list[this.index],
					}
					let res = await service.httpRequest('po_set',query)
					plus.nativeUI.alert(res.message)
					//console.log(this.index)
					//console.log(this.data.list[this.index].phone)
					this.value='' 
					
					const querys = {
						id:data.id,
						page:1
					}
					let ress = await service.httpRequest('my_tuandui',querys)
					this.data=ress.data 
				}
			},
			async upCallback(mescroll) {
				let datas = uni.getStorageSync('storage')
				const query = {
					id:datas.id,
					page:mescroll.num
				}
				let res = await service.httpRequest('my_tuandui',query)
			    let	curPageData = res.data.list
				
				if(mescroll.num == 1) this.data.list = []; //如果是第一页需手动置空列表
				
				this.data.list = this.data.list.concat(curPageData); //追加新数据
				this.data = res.data
				//console.log(this.data.list[0].phone) 
				
			
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
	.textnav1{
		color: #349cfe; 
		font-size: 30upx;
		text-align: center;
		width: 50%;
	}
	.textnav{
		font-size: 30upx;
		text-align: center;
		width: 50%;
		margin-top: 40upx;
	}
	.titlenav{
		width: 90%;
		background: #fff;
		border-radius: 30upx;
		margin: 20upx auto; 
		position: relative;
		margin: 3%;
		box-shadow: 0px 3px 5px #888888;
		padding: 20upx;
	}
	
	/* 	弹出框样式 */
	input {
			border: #E5E5E5 1px solid;
			width: 90%;
			margin: 20upx;
			padding: 10upx;
		}

</style>
