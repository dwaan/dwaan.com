"use strict"

// API call helper
var api = {
	url: "/replurk/api/",
	requests: [],
	storageExceeded: false,
	call: function (url, wait = 2.5) {
		function sortenUrl(url = "") {
			url = url.replace("?fetch=response&plurk_ids=", "pid=")
			url = url.replace("?fetch=plurk&filter=my&offset=", "off=")
			url = url.replace("?fetch=APP&url=/Profile/getPublicProfile&user_id=", "pud=")
			return url
		}

		return new Promise(resolve => {
			var request
			var storage = sessionStorage.getItem(sortenUrl(url))
			if (storage == null) storage = sessionStorage[sortenUrl(url)]

			if (storage && !(url == "?fetch=logout" || url == "?request=token" || url == "?")) {
				// Give sometime out to allow browser to process
				setTimeout(async () => {
					const LZString = await import('lz-string')

					try {
						resolve({
							success: true,
							error: false,
							message: JSON.parse(LZString.decompressFromUTF16(storage))
						})
					} catch { }
				}, wait)
			} else {
				// Save it in array so it can be aborted later
				this.requests.push(new XMLHttpRequest())

				request = this.requests[this.requests.length - 1]
				request.open('GET', this.url + url + "&include_plurks=false&minimal_user=true")
				request.onload = async () => {
					if (request.status == 200 || request.status == 304) {
						var result = JSON.parse(request.response)
						const LZString = await import('lz-string')

						try {
							var data = LZString.compressToUTF16(JSON.stringify(result.message))
							sessionStorage.setItem(sortenUrl(url), data)
						} catch {
							if (!this.storageExceeded) {
								console.info("Exceeding maximum session storage. Data will be downloaded directly from Plurk, if you recently open other RePlurk year in the same browser tab, you can try close this tab and open a new one to avoid downloading too much when reloading this page.")
								this.storageExceeded = true
							}
						}
						resolve(result)
					}
					else resolve({ success: false, error: true, message: {} })
				}
				request.send()
			}
		})
	},
	clear: () => sessionStorage.clear(),
	abort: function () {
		this.requests.forEach(request => request.abort())
		this.requests = []
	}
}

export default api