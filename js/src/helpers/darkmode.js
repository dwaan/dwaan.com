
//////////////// Dark Mode
var darkmode = false;
var browserColorLight = "";
var browserColorDark = "";
function toggleDarkMode(duration = 0.24, ease = "power3.in") {
    var color = "";

    if (darkmode) {
        color = browserColorDark == "" ? "#000000" : browserColorDark;
        addClass(_q("html"), "dark");
    } else {
        color = browserColorLight == "" ? "#FFFFFF" : browserColorLight;
        removeClass(_q("html"), "dark");
    }

    gsap.to(document.querySelector("meta[name=theme-color]"), {
        attr: { "content": color },
        duration: duration,
        ease: ease
    });
    gsap.to(document.querySelector("html"), {
        backgroundColor: color,
        duration: duration,
        ease: ease
    });
}
if (window.matchMedia) {
    var darkmodemedia = window.matchMedia('(prefers-color-scheme: dark)');
    var setdarkmode = function (e) {
        if (e.matches) darkmode = true;
        else darkmode = false;
        toggleDarkMode();
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