import config from './config.js'

const httpRequest = async ( pagename , query )=>{
	let data = JSON.parse(JSON.parse(plus.storage.getItem("storage")))
		try {
		var [error, res] = await uni.request({
			url:config + pagename,
			data:query,
			header:{
				'token': data.token
			},
			method:'POST'
		})
		if (error) {
			console.log(error);
			return false;
		}
		return res.data
	} catch (e) {
	console.log(JSON.stringify(e));
	return false;
	}
}

export default { httpRequest }