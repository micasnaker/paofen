<template>
	<view > 
		<view style="display: flex;">
			<view @tap="getchang(item.index)" v-for="(item,index) in nav" class="box" :class="{active:item.index==isActive}">{{item.title}}</view>
		</view>

		
		<view style="padding: 20upx;">

			<view :id="item.index"  v-for="(item,index) in nav" class="nav">{{item.text}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nav:[{index:'jieshao',title:'产品介绍',text:'本项目为USDT聚合支付码跑分平台，用户注册成为平台会员后进行实名认证，实名认证审核成功后2-3日内会生成自己的收款二维码，然后会员就可以充值USDT到平台作为押金额度，平台开始使用会员的收款码进行收款，收款对应USDT流水（收款+手续费），每笔收款会对应减少USDT的抵押额度，直到抵押额度完成。'},
				{index:'jieshi',title:'名词解释',text:'USDT：泰达币（USDT）是一种将加密货币与法定货币美元挂钩的虚拟货币，是一种保存在外汇储备账户、获得法定货币支持的虚拟货币。本系统使用的是ERC20发行的USDT。需要对接USDT的充提币。'},
				{index:'chenggong',title:'购买成功',text:'333333'},
				{index:'shibai',title:'购买失败',text:'444444'}],
				isActive:'jieshao',
			}
		},
		methods:{
			updated(index){
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+index).boundingClientRect(data => {
				  // console.log("得到布局位置信息" + JSON.stringify(data));
				  // console.log("节点离页面顶部的距离为" + data.top);
				  
				  uni.pageScrollTo({
				  	scrollTop: data.top,
				  	duration: 300
				  });
				}).exec();

			},
			getchang(index){ 
				this.isActive = index;	
				
				this.updated(index)
			}
		}
	}
</script>

<style>
	.title{
		width: 80%;
		color: #687c99;
		font-weight: 600;
		font-size: 32upx;
		margin: 0 auto;
		text-align: center;
		margin-top: 40upx;
	}
	.nav{
		color: #687c99;
		font-size: 28upx;
		margin: 10upx 0;
		height: 400upx;
		border: #007AFF solid 1upx;
	}
	.navs{
		color: #687c99;
		font-size: 28upx;
		margin: 5upx 20upx;
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
		background: #00acfe;
		color: #fff;
		font-size: 24upx;
		text-align: center;
		border-radius: 50upx;
		line-height: 60upx;
		margin: 20upx;
	}
</style>
