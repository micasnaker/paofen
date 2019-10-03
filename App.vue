<script>
	import config from './utils/config.js'
	export default {
		onLaunch: function() {
			console.log('App Launch') 
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary') //锁定
			// 整包检测升级
			//console.log(config+'regeng')
			// uni.request({ 
			// 	url: config+'regeng', //检查更新的服务器地址
			// 	data: { 
			// 		version: plus.runtime.version
			// 	}, 
			// 	method:'POST',
			// 	success: (res) => {
			// 		// plus.nativeUI.alert(plus.runtime.version)
			// 		// plus.nativeUI.alert('success', res)
			// 		//console.log('success', res);
			// 		if (res.statusCode == 200 && res.data.data.status === 1) {
			// 			//let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android
			// 			// 提醒用户更新
			// 			uni.showModal({
			// 				title: '提示',
			// 				content: '确定退出登录？',
			// 				success: (showResult) => {
			// 					if (showResult.confirm) {
			// 						plus.runtime.openURL(res.data.data.url);
			// 						// plus.nativeUI.alert(res.data.data.url)
			// 					}
			// 				}
			// 			})
			// 		}
			// 	},
			// 	fail: (error) => {
			// 		console.log(error)
			// 	}
			// })
			// #endif
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
					//console.log(widgetInfo.version)

					uni.request({  
						url: config+'regeng',  
						data: {  
							version: widgetInfo.version,  
						},  
						method:'POST', 
						success: (result) => { 
							//var data = result.data.data;  
							console.log(result.data.data.status)
							if (result.data.data.status==1) { 
								uni.showLoading({
									title: '更新中...',
									mask:true
								});
								//console.log(result.data.data.url)
								uni.downloadFile({     
									url: result.data.data.url,  
									success: (downloadResult) => {   
										if (downloadResult.statusCode === 200) {  
											plus.runtime.install(downloadResult.tempFilePath, {  
												force: false  
											}, function() {  
												uni.hideLoading();
												//plus.nativeUI.alert('install success...');  
												plus.runtime.restart();  
											}, function(e) {  
												//console.log(e)
												plus.nativeUI.alert('安装失败！')  
											})  
										}  
									}  
								})  
							}  
						}  
					})
				})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	
	page{
		background: #fff;
	}
	
	.focusInput {
		border: #007AFF 1upx solid;
		border-style:solid;  
		border-color: #03a9f4;  
		box-shadow: 0 0 10px #03a9f4; 
	}

	input{
		ime-mode: disabled;
	}
</style>
