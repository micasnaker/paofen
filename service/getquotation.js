import config from '../utils/config.js';
export const get_quotation = async ()=>{
		//let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
		try {
		var [error, res] = await uni.request({
			url:config+'hangqing',
			// data:{
			// 	id:data.id
			// },
			// header:{
			// 	'token': data.token
			// },
			method:'POST'
		})
		if (error) {
			console.log(error);
			return false;
		}
		return res.data.data
	} catch (e) {
	console.log(JSON.stringify(e));
	return false;
	}
} 

 