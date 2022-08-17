"use strict";

// API call helper
var api = {
	url: "./plurk-api",
	request: [],
	storageExceeded: false,
	call: function (url, wait = 2.5) {
		return new Promise(resolve => {
			var request;
			var storage = sessionStorage.getItem(url);
			if (storage == null) storage = sessionStorage[url];

			if (storage && !(url == "?fetch=logout" || url == "?request=token" || url == "?")) {
				// Give sometime out to allow browser to process
				setTimeout(async() => {
					const LZString = await import('lz-string');

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
				request.open('GET', this.url + url + "&include_plurks=false&minimal_user=true");
				request.onload = async () => {
					if (request.status == 200 || request.status == 304) {
						var result = JSON.parse(request.response);
						const LZString = await import('lz-string');

						try {
							sessionStorage.setItem(url, LZString.compressToUTF16(JSON.stringify(result.message)));
						} catch {
							if (!this.storageExceeded) {
								console.info("Exceeding maximum session storage. Data will be downloaded directly from Plurk, if you recently open other RePlurk year in the same browser tab, you can try close this tab and open a new one to avoid downloading too much when reloading this page.");
								this.storageExceeded = true;
							}
						}
						resolve(result);
					}
					else resolve({ success: false, error: true, message: {} });
				}
				request.send();
			}
		});
	},
	clear: function () {
		sessionStorage.clear();
	},
	abort: function () {
		for (var i = 0; i < this.request.length; i++) {
			this.request[i].abort();
		}
		this.request = [];
	}
}

export default api;