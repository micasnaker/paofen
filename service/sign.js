import config from '../utils/config.js';

const get_sign = (phone,pass)=>{
		 uni.request({
			url:config + 'login',
			data:{
				phone:phone,
				pass:pass
			},
			method:'POST',
			success: (res) => {
				// console.log(JSON.stringify(res.data)+"登录信息") 
				plus.nativeUI.toast(res.data.message)
				//plus.storage.getItem("storage")
				//console.log(res.data.data)
				//plus.storage.setItem("storage",res.data.data)
				uni.setStorageSync("storage",res.data.data)
				if(res.data.error_code == 0){
					uni.reLaunch({
						url: '../bottom-nav/home'
					})
				}
			},
			fail: (error) => {
				console.log(error.data); 
			}
		})
	} 

export default  { get_sign  } 