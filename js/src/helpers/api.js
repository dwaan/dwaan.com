// API call helper
var api = {
	url: "./plurk-api",
	request: [],
	call: function(url) {
		var request;

		// Save it in array so it can be aborted later
		api.request.push(new XMLHttpRequest());

		request = api.request[api.request.length - 1];
		request.open('GET', api.url + url);

		return new Promise(resolve => {
			request.onload = function() {
				if(this.status == 200) resolve(JSON.parse(this.response));
				else resolve(false);
			}
			request.send();
		});
	},
	abort: function() {
		for(var i = 0; i < api.request.length; i++) {
			api.request[i].abort();
		}
		api.request = [];
	}
}