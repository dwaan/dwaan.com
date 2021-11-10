// API call helper
var api = {
	url: "./plurk-api",
	request: [],
	call: function(url) {
		return new Promise(resolve => {
			var request;
			var storage = sessionStorage.getItem(url);
	
			if(storage && (url != "?fetch=logout" || url != "?request=token" || url != "?")) {
				// Give sometime out to allow browser to process
				setTimeout(() => {
					resolve(JSON.parse(LZString.decompressFromUTF16(storage)));
				}, 2.5);
			} else {
				// Save it in array so it can be aborted later
				this.request.push(new XMLHttpRequest());
		
				request = this.request[this.request.length - 1];
				request.open('GET', this.url + url + "&include_plurks=false&minimal_user=true&minimal_data=true");
				request.onload = function() {
					if(this.status == 200 || this.status == 304) {
						try {
							sessionStorage.setItem(url, LZString.compressToUTF16(this.response));
						} catch {
							console.info("Exceeding maximum session storage");
						}
						resolve(JSON.parse(this.response));
					}
					else resolve(false);
				}
				request.send();
			}
		});
	},
	clear: function() {
		sessionStorage.clear();
	},
	abort: function() {
		for(var i = 0; i < this.request.length; i++) {
			this.request[i].abort();
		}
		this.request = [];
	}
}