"use strict";

import { _q, _qAll } from '../helpers/helper.js';
import scroll from "../helpers/scroll.js";

function animation(next) {
	// Links
	next.querySelectorAll(".links").forEach(el => {
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll("nav > *"),
			position: "100%"
		});
	});
}

export default animation;