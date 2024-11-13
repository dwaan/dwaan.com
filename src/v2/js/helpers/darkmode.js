"use strict";

import { gsap } from 'gsap';
import { _q, removeClass, addClass, reduceMotionFilter } from "./helper.js";

/**
 * Call dark mode script
 * @param {boolean} debug display log
 */

//////////////// Dark Mode
class darkMode {
    darkmode = false;
    browserColorLight = "";
    browserColorDark = "";

    constructor(debug = false) {
        if (window.matchMedia) {
            var darkmodemedia = window.matchMedia('(prefers-color-scheme: dark)');
            var setdarkmode = (e) => {
                if (e.matches) this.darkmode = true;
                else this.darkmode = false;
                this.setDarkMode();
            }
            setdarkmode(darkmodemedia);
            darkmodemedia.addListener(function (e) {
                setdarkmode(e);
            });
        }

        // Report size of window
        if (debug) {
            console.info("Window:", window.innerWidth, window.innerHeight);
            console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
            window.addEventListener('resize', function () {
                console.info("Window:", window.innerWidth, window.innerHeight);
                console.info("Body:", _q("body").offsetWidth, _q("body").offsetHeight);
            });
        }
    }

    toggleDarkMode(duration = 0.24, ease = "power3.in") {
        this.darkmode = !this.darkmode;
        this.setDarkMode(duration, ease);
    }

    setDarkMode(duration = 0.24, ease = "power3.in") {
        var color = "";

        if (this.darkmode) {
            color = this.browserColorDark == "" ? "#000000" : this.browserColorDark;
            addClass(_q("html"), "dark");
        } else {
            color = this.browserColorLight == "" ? "#FFFFFF" : this.browserColorLight;
            removeClass(_q("html"), "dark");
        }

        gsap.to(document.querySelector("meta[name=theme-color]"), {
            attr: { "content": color },
            duration: reduceMotionFilter(duration),
            ease: ease
        });
        gsap.to(document.querySelector("html"), {
            backgroundColor: color,
            duration: reduceMotionFilter(duration),
            ease: ease
        });
    }
}

var darkmode = new darkMode();

export default darkmode;