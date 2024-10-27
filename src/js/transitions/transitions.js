"use strict";

import transition_from_lost from './from-lost.js';
import transition_from_plurk from './from-plurk.js';
import transition_hi_to_home from './hi-to-home.js';
import transition_home_to_detail from './home-to-detail.js';
import transition_home_to_hi from './home-to-hi.js';
import transition_home_to_me from './home-to-me.js';
import transition_once_default from './once-default.js';
import transition_to_lost from './to-lost.js';

/**
 * Collections of Barba.js Transitions
 */
var transitions = [
    transition_once_default,
    transition_home_to_detail,
    transition_home_to_me,
    transition_home_to_hi,
    transition_hi_to_home,
    transition_from_lost,
    transition_to_lost,
    transition_from_plurk
];

export default transitions;