import md5 from 'js-md5';
import config from '../utils/config.js';

const get_code = (phone,type)=>{
		uni.request({
			url:config+'get_time',
			method:'POST',
			success: (res) => {
				let md = md5(res.data.data+'feifajizi')
				 uni.request({
					url:config+'sender',
					data:{
						phone:phone,
						type:type,
						time:res.data.data,
						sign:md
					},
					method:'POST',
					success: (res) => {
						console.log(res)
					}
				})
		},fail: (error) => {
			console.log(error)
		}
	})
} 

export default { get_code }