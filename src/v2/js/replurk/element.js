"use strict"

import span from "./span.js"

/*
    Plurk element object spesification:

    1. id: contain the id name
    2. user: contain user object
    3. attached: status of element is attached in DOM or not
    4. create(): create the DOM element
    4. destroy(): remove the DOM element
    4. update(): update the DOM element based on it's current value
    5. insertTo(element): insert DOM element to spesific element, also will check if it's already created or not
*/

class element {
    constructor(id, data, avatarurl, customcreate) {
        this.id = id
        this.user = data
        this.user_id = data.id
        this.value = data.nick_name
        this.nick_name = data.nick_name
        this.attached = false
        this.hidden = true
        this.count = 1
        this.position = 0
        this.customcreate = customcreate
        this.el = document.createElement('a')
        this.created = false
        this.avatarurl = avatarurl
        this.counts = new span().class("count").html(this.count)
    }

    create() {
        this.created = true

        this.el.setAttribute("id", this.id + this.user_id)
        this.el.setAttribute("class", 'plurkers')
        this.el.setAttribute("href", 'https://plurk.com/' + this.user.nick_name)
        this.el.setAttribute("target", '_BLANK')

        if (!this.customcreate) {
            this.avatar = new span()
                .class("avatar")
                .html(`<img src="${this.avatarurl}" />`)
            this.name = new span()
                .class("name")
                .html(`${this.user.display_name}`)
            this.counts = new span()
                .class('count')
                .html(this.count)
            this.el.appendChild(this.avatar.el)
            this.el.appendChild(this.name.el)
            this.el.appendChild(this.counts.el)
        } else {
            this.customcreate(this)
        }
    }

    insertTo(element) {
        if (!this.created) this.create()

        this.attached = true
        element.insertAdjacentElement("beforeend", this.el)
    }

    destroy() {
        this.attached = false

        if (this.el) {
            this.el.remove()
            return true
        } else {
            return false
        }
    }

    update() {
        // Only update when it's attached
        if (this.attached) {
            this.counts.update(`${this.count}`)
        }
    }
}

export default element