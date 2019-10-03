<template>
	<view>
		<view style="display: flex;justify-content: space-between;margin-top: 60upx;" >
			<text class="textnav">货币</text>
			<text class="textnav">最近价格</text>
			<text class="textnav">涨跌幅</text>
		</view>
		
		<view style="width: 100%;">
			<image src="../../static/img/line.png" style="height: 1upx;width: 100%;margin: 20upx auto;"></image> 
		</view>
		
		<view v-for="item in quotation"  @click="go_details" style="display: flex;justify-content: space-between;margin-top: 20upx;">
			<text class="textnav1" style="margin-top: 20upx;">{{coin[item.coin]}}</text>
			<view class="textnav1" ><view class="textnav2" >{{item.cost.replace("USD","")}}</view><view class="textnav3" >{{item.market_cap.replace("USD","")}}</view></view>
			<text class="negative" :class="{ just:item.trend>=0 }" style="margin-top: 20upx;">{{item.trend}}</text>
		</view>
	</view>
</template>

<script>
	import { get_quotation} from '../../service/getquotation.js'
	export default{
		data(){
			return{
				quotation:[],
				coin:{
					'Bitcoin':'BTC',
					'Ethereum':'ETH',
					'XRP':'XRP',
					'Dash':'Dash',
					'NEM':'NEM',
					'Monero':'XMR',
					'Ethereum Classic':'ETC',
					'Tether':'USDT',
					'VeChain':'VEN ',
					'Qtum':'QTUM',
					'Binance Coin':'BNB',
					'Bytecoin':'BCN ',
					'Dogecoin':'DOGE',
					'Siacoin':'CWC' ,
					'NEO':'NEO',
					'Litecoin':'LTC'
					}
			}
		},
		onLoad() {
			this.getquotation()
		},
		methods:{
			async getquotation(){
				this.quotation = await get_quotation()
				console.log(JSON.stringify(this.quotation))
			}
		}
	}
</script>

<style>
	.textnav{
		width: 30%;
		color: #349cfe;
		font-size: 32upx;
		text-align: center;
	}

	.textnav1{
		width: 30%;
		color: white; 
		font-size: 30upx;
		text-align: center;
	}
	.negative{
		width: 30%;
		color: red; 
		font-size: 30upx;
		text-align: center;
	}
	.just{
		color: green
	}
	.textnav2{
		color: white; 
		font-size: 32upx;
		text-align: center;
	}
</style>
