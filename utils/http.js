export default class http {
	constructor() {
		this.host = "192.168.1.150:"
		this.port = "8083";
		this.url = "/Services/MultiApi/"
	}
	post(url, parameter) {
		let head = {
			angent: "web",
			appkey: "3DC1ACF7-94ED-4098-9CEA-453A6DFF42F9"
		}
		if(uni.getStorageSync('UserContext')){
			let userContext = JSON.parse(uni.getStorageSync('UserContext'));
			head["token"] = userContext.token;
			head['userid'] = userContext.userid
		}
		return uni.request({
			url: "http://" + this.host + this.port + "/Services/MultiApi/" + url + "/json",
			data: {
				head:head,
				parameter:parameter
			},
			header:{
				"content-type":"application/json"
			},
			method:"POST",
		})
	}
}
