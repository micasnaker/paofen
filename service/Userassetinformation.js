import config from '../utils/config.js';
const get_information = async ()=>{
		let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
		//console.log(data.token)
		try {
		var [error, res] = await uni.request({
			url:config+'member/money_info',
			data:{
				id:data.id
			},
			header:{
				'token': data.token
			},
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

export default { get_information}