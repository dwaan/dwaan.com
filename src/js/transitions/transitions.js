"use strict";

import transition_from_lost from './from-lost';
import transition_from_plurk from './from-plurk';
import transition_hi_to_home from './hi-to-home';
import transition_home_to_detail from './home-to-detail';
import transition_home_to_hi from './home-to-hi';
import transition_home_to_me from './home-to-me';
import transition_once from './once';
import transition_to_lost from './to-lost';

/**
 * Collections of Barba.js Transitions
 */
var transitions = [transition_once, transition_home_to_detail, transition_home_to_me, transition_home_to_hi, transition_hi_to_home, transition_from_lost, transition_to_lost, transition_from_plurk];

export default transitions;