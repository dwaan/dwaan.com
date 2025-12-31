'use strict'

import { gsap } from 'gsap'

// Animate number
function animateNumber(from, to, onUpdate, onComplete) {
    var load = { progress: from }
    gsap.to(load, {
        progress: to,
        snap: "progress",
        ease: "linear",
        duration: reduceMotionFilter(.5),
        onUpdate: function () {
            if (onUpdate) onUpdate(load.progress)
        },
        onComplete: function () {
            if (onComplete) onComplete(load.progress)
        }
    })
}
////////////////////// Huge text animation
class hugeText {
    constructor(el) {
        this.element = _q(el)
        this.element.innerHTML = "<span></span>"
        this.cancelhide = false
        this.onshow = false
        this.tween = null

        gsap.set(this.element.children, { yPercent: 100 })
        gsap.fromTo(this.element.children, {
            xPercent: -25
        }, {
            duration: reduceMotionFilter(10),
            repeat: -1,
            ease: "linear",
            xPercent: -75
        })

        this.show = function (text) {
            this.cancelhide = true
            this
                .element
                .querySelector("span")
                .innerHTML = "<i>" + text + "</i><i>" + text + "</i><i>" + text + "</i><i>" + text + "</i>"
            if (this.tween != null)
                this.tween.kill()
            this.tween = gsap.to(this.element.children, {
                duration: reduceMotionFilter(.512),
                ease: "expo",
                yPercent: 0
            })
        }

        this.hide = function () {
            var that = this
            this.tween = gsap.to(this.element.children, {
                duration: reduceMotionFilter(.512),
                ease: "expo",
                yPercent: 100,
                onComplete: function () {
                    if (that.cancelhide) {
                        that.cancelhide = false
                    } else {
                        that
                            .element
                            .querySelector("span")
                            .innerHTML = ""
                    }
                }
            })
        }

        return this
    }
}
///////////////// Animate Number
class animateNumbers {
    constructor(selector) {
        var that = this
        this.game = {
            score: 0
        }
        this.selector = _q(selector)
        this.value = this.selector.textContent || this.selector.innerText
        this.plus = "+"
        this.value = this.value.split("+")
        if (this.value.length <= 1) {
            this.plus = ""
        }
        this.value = this.value[0]
        this.selector.innerHTML = "0" + this.plus
        this.animate = function () {
            gsap.to(that.game, 5, {
                score: "+=" + that.value,
                roundProps: "score",
                onUpdate: that.updateHandler,
                ease: "expo.out"
            })
        }
        this.updateHandler = function () {
            that.selector.innerHTML = that.game.score + that.plus
        }
        this.animate()
    }
}
class animateYears {
    constructor(selector, year) {
        this.game = {
            score: 0
        }
        this.selector = _q(selector)
        this.year__now = (new Date()).getFullYear(),
            this.year__animate = (this.year__now - year)
        this.animate = () => {
            gsap.to(this.game, 5, {
                score: "+=" + this.year__animate,
                roundProps: "score",
                onUpdate: this.updateHandler,
                ease: "expo.out"
            })
        }
        this.updateHandler = () => {
            this.selector.innerHTML = this.game.score + "+"
        }
        this.animate()
    }
}

export {
    animateNumber,
    hugeText,
    animateNumbers,
    animateYears,
}