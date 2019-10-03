import config from '../utils/config.js';

const get_message = async () => {
	let data = uni.getStorageSync('storage')
	// console.log(data.token)
	try {
		var [error, res] = await uni.request({
			url: config + 'my_info',
			data: {
				id: data.id
			},
			header: {
				'token': data.token
			},
			method: 'POST'
		})
		if (error) {
			//console.log(error);
			plus.nativeUI.alert('网络请求超时！')
			return false;
		}

		if (res.data.error_code == 2018) {
			plus.nativeUI.alert('登录过期，请重新登录！')
			uni.reLaunch({
				url: '/pages/verification-login'
			})

		} else if (res.data.error_code == 2019) {
			plus.nativeUI.alert('异地登录警告：请尽快修改您的登录密码！')
			uni.reLaunch({
				url: '/pages/verification-login'
			})
		}
		return res.data.data
	} catch (e) {
		console.log(JSON.stringify(e));
		return false;
	}
}

export default {
	get_message
}
