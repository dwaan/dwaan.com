// API call helper
var api = {
	url: "./plurk-api",
	request: [],
	storageExceeded: false,
	call: function(url, wait = 2.5) {
		return new Promise((resolve, reject) => {
			var request;
			var storage = sessionStorage.getItem(url);
	
			if(storage && (url != "?fetch=logout" || url != "?request=token" || url != "?")) {
				// Give sometime out to allow browser to process
				setTimeout(() => {
					resolve({
						success: true,
						error: false,
						message: JSON.parse(LZString.decompressFromUTF16(storage))
					});
				}, wait);
			} else {
				// Save it in array so it can be aborted later
				this.request.push(new XMLHttpRequest());
		
				request = this.request[this.request.length - 1];
				request.open('GET', this.url + url + "&include_plurks=false&minimal_user=true&minimal_data=true");
				request.onload = () => {
					if(request.status == 200 || request.status == 304) {
						var result = JSON.parse(request.response);
						if(result.success) {
							try {
								sessionStorage.setItem(url, LZString.compressToUTF16(JSON.stringify(result.message)));
							} catch {
								if(!this.storageExceeded) {
									console.info("Exceeding maximum session storage. Data will be downloaded directly from Plurk, if you recently open other RePlurk year in the same browser tab, you can try close this tab and open a new one to avoid downloading too much when reloading this page.");
									this.storageExceeded = true;
								}
							}
							resolve(result);
						} else reject(false);
					}
					else reject(false);
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