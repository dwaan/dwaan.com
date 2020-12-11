// API call helper
var api = {
	url: "/dwaan/plurk-api",
	request: [],
	call: function(url, success, error) {
		var request = this.request[this.request.push(new XMLHttpRequest()) - 1];

		request.open('GET', this.url + url, true);
		request.onload = function() {
			if (this.status == 200) {
				if(success) success(JSON.parse(this.response));
			} else if (this.status != 0) {
				if(error) error(this.response);
			}
		}
		request.send();
	},
	abort: function() {
		for (var i = 0; i < this.request.length; i++) {
			this.request[i].abort();
		}
		this.request = [];
	}
}