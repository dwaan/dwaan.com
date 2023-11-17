"use strict";

import detailview from './detail';
import hiview from './hi';
import homeview from './home';
import lostview from './lost';
import meview from './me';
import plurkview from './plurk';

/**
 * Collections of Barba.js Views
 */
var views = [homeview, detailview, meview, hiview, lostview, plurkview.replurk2020view, plurkview.replurk2021view, plurkview.replurk2022view, plurkview.replurk2023view];

// Make accesable
window.plurkview = plurkview;

export default views;