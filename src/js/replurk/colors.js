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
                'rgb(63,94,251)',     // Dodger Blue
                'rgb(252,70,107)',    // Radical Red
                'rgb(34,193,195)',    // Light Sea Green
                'rgb(253,187,45)',    // Goldenrod
                'rgb(195,34,190)',    // Deep Pink
                'rgb(219,158,0)',     // Golden Yellow
                'rgb(75,231,152)',    // Medium Spring Green
                'rgb(195,34,103)',    // Cerise
                'rgb(45,182,253)'     // Dodger Blue (Lighter)
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