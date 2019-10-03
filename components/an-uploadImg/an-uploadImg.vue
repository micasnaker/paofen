<template>
	<view>
		<view class="group">
			<image @click="chooseImage(1)" class="an-img-add2" style="left: 40upx;" :src="imgurl"></image>
			<view  class="an-img-add" @click="chooseImage(1)">
				<uni-icon type="plusempty" size="42" color="#4286de" style="color: #4286de;font-size: 52upx;">+</uni-icon>
			</view>
			
			<image @click="chooseImage(2)" class="an-img-add2" style="right: 40upx;" :src="imgurls"></image>
			<view  class="an-img-add" style="float: right;" @click="chooseImage(2)">
				<uni-icon type="plusempty" size="42" color="#4286de" style="color: #4286de;font-size: 52upx;">+</uni-icon>
			</view>
		</view>  
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import { pathToBase64 } from '../../utils/base64.js'	
	import config from '../../utils/config.js'
	
	export default {
		name: 'AnUploadImg', 
		components:{ uniIcon },
		data() {
			return {
				imgurl:null,
				imgurls:null
			};
		},
		methods:{
			chooseImage(e) {
				switch (e){
					case 1:
					uni.chooseImage({
						count:1,
						    success: (chooseImageRes) => {
							  pathToBase64(chooseImageRes.tempFilePaths[0])
								  .then(base64 => {
									let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
									uni.showLoading({
										title: '图片上传中...',
										mask:true
									});
									uni.request({
										url:config + 'member/base64_upload',
										data:{
											id:data.id,
											base64:base64,
											type:1
										},
										header:{
											'token': data.token
										},
										method:'POST',
										success: (res) => {
											plus.nativeUI.toast('正面上传成功！')
											uni.hideLoading()
											this.imgurl = chooseImageRes.tempFilePaths[0]
											console.log(res.data.error_code)
											if(res.data.error_code==0){
												this.$emit('func',res.data.data.url)
											}
											
										},
										fail: (error) => {
											plus.nativeUI.toast('正面上传失败！')
										}
									})
								  })
								.catch(error => {
									console.error(error) 
								})
							}
						})
						break;
					default:
					uni.chooseImage({
						count:1,
						    success: (chooseImageRes) => {
							  pathToBase64(chooseImageRes.tempFilePaths[0])
								  .then(base64 => {
									uni.showLoading({
									  	title: '图片上传中...',
									  	mask:true
									});
									let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
									uni.request({
										url:config + 'member/base64_upload',
										data:{
											id:data.id,
											base64:base64,
											type:2
										},
										header:{
											'token': data.token
										},
										method:'POST',
										success: (res) => {
											plus.nativeUI.toast('背面上传成功！')
											uni.hideLoading()
											this.imgurls = chooseImageRes.tempFilePaths[0]
											if(res.data.error_code==0){
												this.$emit('funcs',res.data.data.url)
											}	
										},
										fail: (error) => {
											plus.nativeUI.toast('背面上传失败！')
										}
									})
								  })
								.catch(error => {
									console.error(error) 
								})
							}
						})
						break;
				}

			}
		}
	}
</script>

<style>
	.group{
		height: 300upx;
		margin-top: 40upx;
	}
	.an-img-add{
		float: left; 
		height: 200upx; 
		width: 300upx; 
		border: #4286de solid 1upx;
		background: #13213d;
		text-align: center; 
		line-height: 200upx;
	}
	.an-img-add2{
		height: 200upx; 
		width: 300upx; 
		border: #4286de solid 1upx;
		position: absolute;
	}
</style>
