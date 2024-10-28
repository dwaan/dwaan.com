"use strict"

import { _q, _qAll, animateNumber } from '../helpers/helper.js'

/*
    Simple span element object:

    1. update(text): Update the content with text value, and animate it if it's number.
    2. html(html): Update the content with html value.
    3. class(classname): Add class name to span.
*/

class span {
    constructor() {
        this.el = document.createElement('span')
        return this
    }

    class(...classname) {
        this.el.classList.add(...classname)
        return this
    }

    html(html) {
        this.el.innerHTML = html
        return this
    }

    update(text) {
        animateNumber(this.el.textContent, text, (text) => {
            this.el.textContent = text
        })
        return this
    }
}

export default span