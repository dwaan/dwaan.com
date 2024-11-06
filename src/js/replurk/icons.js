"use strict";

var icons = {
	link: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path id="right" d="M19.188,12.001c0,1.1-0.891,2.015-1.988,2.015l-4.195-0.015C13.543,15.089,13.968,16,15.002,16h3C19.658,16,21,13.657,21,12s-1.342-4-2.998-4h-3c-1.034,0-1.459,0.911-1.998,1.999l4.195-0.015C18.297,9.984,19.188,10.901,19.188,12.001z"/><path id="center" d="M8,12c0,0.535,0.42,1,0.938,1h6.109c0.518,0,0.938-0.465,0.938-1c0-0.534-0.42-1-0.938-1H8.938C8.42,11,8,11.466,8,12z"/><path id="left" d="M4.816,11.999c0-1.1,0.891-2.015,1.988-2.015L11,9.999C10.461,8.911,10.036,8,9.002,8h-3c-1.656,0-2.998,2.343-2.998,4s1.342,4,2.998,4h3c1.034,0,1.459-0.911,1.998-1.999l-4.195,0.015C5.707,14.016,4.816,13.099,4.816,11.999z"/></svg>',
	draw: function (title, flat = false) {
		if (flat) {
			return `<img src="https://api.iconify.design/fluent-emoji-high-contrast/${title}.svg?color=%2388888888" />`
		} else {
			return `<img src="https://api.iconify.design/fluent-emoji/${title}.svg" />`
		}
	}
}

export default icons;