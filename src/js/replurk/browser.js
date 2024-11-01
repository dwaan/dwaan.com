import darkmode from "../helpers/darkmode.js"

// Browser color
let browser = {
	get: function (state) {
		if (typeof (state) == "object" && state.length >= 1) {
			if (state.length == 1) {
				darkmode.browserColorDark = state[0];
				darkmode.browserColorLight = state[0];
			} else {
				darkmode.browserColorDark = state[1];
				darkmode.browserColorLight = state[0];
			}
		} else if (state == "green") {
			darkmode.browserColorDark = "#0d4f03";
			darkmode.browserColorLight = "#60e670";
		} else if (state == "yellow") {
			darkmode.browserColorDark = "#705f02";
			darkmode.browserColorLight = "#FFD700";
		} else {
			darkmode.browserColorDark = "#000000";
			darkmode.browserColorLight = "#FFFFFF";
		}

		return [darkmode.browserColorLight, darkmode.browserColorDark];
	},

	set: function (state, duration, ease) {
		this.get(state);
		darkmode.setDarkMode(duration, ease);
	},

	reset: function () {
		this.get();
		darkmode.setDarkMode(1);
	}
}

export default browser