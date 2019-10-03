<template>
	<view style="padding: 40upx">
		<view class="titlebox" >
			<picker @change="bindPickerChange" :value="index" :range="array"> 
				<input disabled :placeholder="rechargeType" style="border: #212a3c 1upx solid;border-radius: 15upx;height: 80upx;margin-top: 15upx;"/>
				<image style="width: 30upx;height: 30upx;float: right;margin-top: -50upx;margin-right: 20upx;" src="../../../../static/img/triangle.png"></image>
			</picker>
		</view> 
		<view class="titlebox" >
			<input v-model="bankcard" type="number" class="inputext" :placeholder="message.bank_card==null?'请输入银行卡号':message.bank_card" />
		</view> 
		<button @tap="get_bank" class="landing" type="primary">保存并使用</button>
	</view>
</template>

<script>
	import message from '../../../../service/message.js'
	import config from '../../../../utils/config.js'
	
	export default{
		data(){
			return{
				rechargeType: '中国工商银行',
				message:null,
				array: [
					'中国工商银行', 
					'招商银行',
					'中国农业银行',
					'中国建设银行',
					'中国广大银行',
					'交通银行',
					'中信银行',
					'兴业银行', 
					'中国人民银行',
					'中国民生银行',
					'中国邮政储蓄银行',
					'中国农业发展银行',
					'华夏银行',
					'中国银行',
					],
					bankcard:null
			}
		},
		onLoad() {
			this.get_message()
		},
		methods:{
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
			},
			bindPickerChange: function(e) {
				this.rechargeType = this.array[e.target.value]
			},
			get_bank(){
				let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
				uni.request({
					url:config+'member/bankcard_set',
					data:{
						id:data.id,
						bank_name:this.rechargeType,
						bank_card:this.bankcard,
					},
					header:{
						'token':data.token
					},
					method:'POST',
					success: (res) => {
						console.log(res.data)
						plus.nativeUI.alert(res.data.message);
						if(res.data.error_code == 0){
							uni.navigateBack({
								delta: 1
							})
						}
					},
					fail: (error) => {
						console.log(error.data)
					}
				})
			}
		}
	}
</script>

<style>
	.titlebox{
		margin-top: 40upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 15upx;
		font-size: 28upx;
		color: white;
	}
	.landing{ 
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
		margin-top: 40upx;
	}
</style>
