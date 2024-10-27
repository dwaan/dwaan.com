"use strict";

import { _q, _qAll, animateNumber } from '../helpers/helper.js';

/*
    Simple span element object:

    1. update(text): update the content with text value, and animate it if it's number
    2. updateHTML(text): update the content with html value
*/

class span {
    constructor(classname, text) {
        this.el = document.createElement('span');
        this.el.setAttribute("class", classname);
        this.el.innerHTML = text;
    }

    update(text) {
        animateNumber(this.el.textContent, text, (text) => {
            this.el.textContent = text;
        });
    }

    updateHTML(text) {
        this.el.innerHTML = text;
    }
}

export default span;