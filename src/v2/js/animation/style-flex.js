"use strict";

import scroll from "../helpers/scroll.js";
import { _q, _qAll } from '../helpers/helper.js';

function animation(next) {
	// Style - Flex
	next.querySelectorAll(".style-flex").forEach(el => {
		// Move text
		scroll.moveText({
			elements: el.querySelectorAll(".style-column .text, .style-column .meta > *"),
			position: "90%"
		});
	});
}

export default animation;