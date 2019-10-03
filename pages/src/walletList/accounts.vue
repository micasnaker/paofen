<template>
	<view style="padding: 40upx">
		<!-- <view class="titlebox" >
			<view class="typetext">钱包地址：</view> 
			<input  class="inputext" placeholder="请输入钱包地址" v-model="codeurl" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">可用金额：</view> 
			<input disabled class="inputext" :placeholder="message.num-message.dongjie" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">冻结金额：</view> 
			<input disabled class="inputext" :placeholder="message.dongjie" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">数量：</view> 
			<input type="number" v-model="num" class="inputext" placeholder="请输入转出数量" />
		</view> 
		<view class="titlebox" >
			<view class="typetext">钱包密码：</view> 
			<input type="password" v-model="password" class="inputext" placeholder="请输入钱包密码" />
		</view> -->
		<view class="tishi">
			亲! 您还没有资产钱包
		</view>
		<view class="title_acc">
			提示:导入私钥或创建生成都可以获得资产钱包
		</view>
		<view class="content_acc">
			<view class="">
				请输入您的私钥获得资产钱包
			</view>
			<view class="content_acc">
				<textarea value="" placeholder="请输入您的私钥" />
			</view>
		</view>
		<button @tap="get_acounts" class="landing" type="primary">导入私钥</button>
		<button @tap="creat_wall" class="landing" type="primary">创建钱包</button>
	</view>
</template>

<script>
	import service from '../../../utils/httpRequest.js'
	import message from '../../../service/message.js'
	export default{
		data(){
			return {
				res:[],
				num:null,
				password:null,
				message:null,
				codeurl:'',
				upLoadClicktag:0
			}
		},
		onLoad(option) {
			this.get_message()
		},
		methods:{
			async get_message(){
				this.message = await message.get_message()
				console.log(this.message)
			},
			async get_acounts(){
				if(this.upLoadClicktag==0){
					this.upLoadClicktag = 1
					let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
					const query = {
						id:data.id,
						num:this.num,
						qianbao:this.codeurl,
						password:this.password
					}
					this.res = await service.httpRequest('zhuan',query)
					plus.nativeUI.toast(this.res.message)
					console.log(JSON.stringify(this.res))
						uni.navigateBack({
							delta: 1
						})
					setTimeout (()=>{
							this.upLoadClicktag = 0
						},3000)
				}else{
					plus.nativeUI.alert('请勿频繁操作！')
				}
			},
			// 创建钱包
			creat_wall(){
				uni.navigateTo({
					url: './asset_wallet'
				});
			}
		}
	}
</script>

<style>
	.typetext{
		color: #349cfe;
		font-size: 30upx;
	}
	.titlebox{
		margin-top: 20upx;
	}
	.inputext{
		border: #212a3c 1upx solid;
		border-radius: 15upx;
		height: 80upx;
		margin-top: 20upx;
		font-size: 28upx;
		color: #fff;
	}
	.landing{ 
		height: 84upx;
		line-height: 84upx;
		border-radius: 10upx;
		font-size: 32upx;
		background: linear-gradient(left,#4286de, #5091e6);
		margin-top: 40upx;
	}
	
	.title_acc{
		padding-top: 50upx;
	}
	
	.content_acc{
		padding-top: 60upx;
	}
	
	.content_acc textarea{
		border: 1px solid #ccc;
		width: 90%;
		height: 200upx;
		margin: auto;
		padding: 20upx;
	}
	
	.tishi{
		color: red;
		text-align: center;
	}
</style>
