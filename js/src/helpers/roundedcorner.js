"use strict";

import { _q, addClass, removeClass } from "./helper";

/**
 * Displaying rounded corner only on fullscreen
 */
function displayRoundedCorner() {
	function roundedCorner() {
		if (window.innerWidth == screen.width && window.innerHeight == screen.height) addClass(_q("html"), "rounded");
		else removeClass(_q("html"), "rounded");
	}
	roundedCorner();
	window.addEventListener('resize', roundedCorner);
}

export default displayRoundedCorner;