"use strict";

import { gsap } from 'gsap';

/*
    Color randomizer

    1. colors: array of colors value
    2. getRandomColor(): get the randomized color from colors list
*/

class colors {
    constructor() {
        this.oldcolor = "";
        this.randomcolors = [];

        const allColorArrays = [
            [
                'rgba(63,94,251,1)',     // Dodger Blue
                'rgba(252,70,107,1)',    // Radical Red
                'rgba(34,193,195,1)',    // Light Sea Green
                'rgba(253,187,45,1)',    // Goldenrod
                'rgba(195,34,190,1)',    // Deep Pink
                'rgba(219,158,0,1)',     // Golden Yellow
                'rgba(75,231,152,1)',    // Medium Spring Green
                'rgba(195,34,103,1)',    // Cerise
                'rgba(45,182,253,1)'     // Dodger Blue (Lighter)
            ]
        ];

        const seconds = Math.floor(Date.now() / 1000); // Get current time in seconds
        const arrayIndex = seconds % allColorArrays.length; // Use seconds to determine the index
        this.colors = allColorArrays[arrayIndex];
    }

    getRandomColor() {
        var color;
        do {
            this.randomcolors = gsap.utils.shuffle(this.colors).slice();
        } while (this.oldcolor == (color = this.randomcolors.pop()));
        this.oldcolor = color;
        return color;
    }
}

export default colors;