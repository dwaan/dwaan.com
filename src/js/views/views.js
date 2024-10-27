"use strict";

import detailview from './detail.js';
import hiview from './hi.js';
import homeview from './home.js';
import lostview from './lost.js';
import meview from './me.js';
import plurkview from './plurk.js';

/**
 * Collections of Barba.js Views
 */
var views = [
	homeview,
	detailview,
	meview,
	hiview,
	lostview,
	plurkview.replurk2020view,
	plurkview.replurk2021view,
	plurkview.replurk2022view,
	plurkview.replurk2023view,
	plurkview.replurk2024view
];

// Make accesable
window.plurkview = plurkview;

export default views;