"use strict";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { _q, _qAll } from '../helpers/helper.js';

// Animations
import plain from '../animation/style-plain.js';
import spread from '../animation/style-spread.js';
import top from '../animation/style-top.js';
import bottom from '../animation/style-bottom.js';
import flex from '../animation/style-flex.js';
import trunc from '../animation/style-trunc.js';
import masonry from '../animation/style-masonry.js';
import angled from '../animation/style-angled.js';
import background from '../animation/style-background.js';
import slideshow from '../animation/style-slideshow.js';
import staggered from '../animation/style-staggered.js';
import center from '../animation/style-center.js';
import threed from '../animation/style-3d.js';
import links from '../animation/links.js';

var detailview = {
	namespace: 'detail',
	beforeEnter: data => {
		var next = data.next.container;

		plain(next);
		spread(next);
		top(next);
		bottom(next);
		flex(next);
		trunc(next);
		masonry(next);
		angled(next);
		background(next);
		slideshow.animation(next);
		staggered(next);
		center(next);
		threed(next);
		links(next);

		setTimeout(_ => {
			ScrollTrigger.refresh()
		}, 1000)
	},
	afterEnter: () => console.info("Right now, you're reading one of my portfolio. Enjoy!"),
	beforeLeave: () => {
		slideshow.clear();
	}
}

export default detailview;