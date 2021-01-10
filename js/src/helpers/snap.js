// Snap functions
var snap = function(elements, snapPosition, markers) {
	if (snapPosition == undefined) snapPosition = 1;
	if (markers == undefined) markers = false;
	if (typeof elements === "string") elements = gToArray(elements);
	// Snap scroll to block
	elements.forEach(function(element, index) {
		scroll.push(function(tl) {
			return tl;
		}, function (tl) {
			return ScrollTrigger.create({
				scroller: "main",
				markers: markers,
				id: "snap",
				trigger: element,
				start: "0 0",
				end: "100% 0",
				onUpdate: function(value){
					this.progress = value.progress;
					this.direction = value.direction;
				},
				snap: {
					snapTo: function(value) {
						var snap = this.progress;

						if (snapPosition == 1) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
						} else if (snapPosition == 2) {
							if (this.progress < .2 && this.direction > 0) snap = 0;
							else if (this.progress > .8 && this.direction < 0) snap = 1;
							else if (this.direction > 0) snap = 1;
							else snap = 0;
						} else if (snapPosition < .5 && this.progress > (1 - snapPosition)) {
							snap = 1;
						} else if (snapPosition < .5 && this.progress < snapPosition) {
							snap = 0;
						}

						return snap;
					},
					delay: 0,
					duration: {
						min: .5,
						max: 2
					},
					ease: "expo.out"
				},
				animation: tl
			});
		});
	});
}